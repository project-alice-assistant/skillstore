let storeSkills;

// noinspection JSUnusedGlobalSymbols
export default {
	name: 'Store',
	data() {
		return {
			skills: [],
			menuOpen: false,
			sortDirection: 'asc',
			orderBy: 'name',
			skillFilter: '',
			cookieIcon: 'fad fa-cookie fa-lg',
			showCookiesWarning: true,
			cookiesRefused: false,
			cookiesAccepted: false,
			showConnectPanel: false,
			userToken: '',
			connectIcon: 'fad fa-wifi-slash fa-fw fa-2x',
			connecting: false,
			connectingFailed: false,
			connected: false,
			ip: '',
			username: '',
			pin: '',
			installedSkills: []
		}
	},
	methods: {
		getStoreData() {
			let self = this;
			this.axios.get('https://skills.projectalice.io/assets/store/skills.json')
				.then(function(response) {
					storeSkills = Object.values(response.data);
					self.listSkills();
				});
		},
		toggleMenu() {
			this.menuOpen = !this.menuOpen;
		},
		listSkills() {
			let filtered = [];
			let self = this;
			if (this.skillFilter !== '') {
				storeSkills.forEach(function(skill) {
					if (skill[self.orderBy].toLowerCase().includes(self.skillFilter)) {
						filtered.push(skill);
					}
				});
			} else {
				filtered = storeSkills;
			}

			let skills = {};
			filtered.forEach(function(skill) {
				if (!(skill[self.orderBy] in skills)) {
					skills[skill[self.orderBy]] = [];
				}
				skills[skill[self.orderBy]].push(skill);
			});

			let keys = this.sort(self, Object.keys(skills));
			let ordered = []
			keys.forEach(function(index) {
				let skillList = skills[index];
				let subDict = {}
				skillList.forEach(function(data) {
					subDict[data.name] = data;
				});

				let subKeys = self.sort(self, Object.keys(subDict));
				let subSorted = [];
				subKeys.forEach(function (key) {
					subSorted.push(subDict[key])
				});

				subSorted.forEach(function(skill) {
					ordered.push(skill);
				});
			});

			this.skills = ordered;
		},
		sort(self, list) {
			// list.sort(function(a, b) {
			// 	if (a.toLowerCase() < b.toLowerCase()) return -1;
			// 	if (a.toLowerCase() > b.toLowerCase()) return 1;
			// 	return 0;
			// });

			list.sort(function(a, b) {
				return a.localeCompare(b, undefined, {
					numeric: self.orderBy === 'downloads',
					sensitivity: 'base'
				});
			});

			if (self.sortDirection === 'desc') {
				list.reverse();
			}
			return list;
		},
		changeSortingDirection(direction) {
			this.sortDirection = direction.toLowerCase();
			if (this.cookiesAccepted) {
				this.$cookies.set('sortDirection', this.sortDirection);
			}
			this.listSkills();
		},
		changeOrder(value)  {
			this.orderBy = value.toLowerCase();
			if (this.cookiesAccepted) {
				this.$cookies.set('orderBy', this.orderBy);
			}
			if (this.orderBy === 'downloads') {
				this.sortDirection = 'desc';
			}
			this.listSkills();
		},
		authorLinkClicked(author)  {
			this.orderBy = 'author';
			this.skillFilter = author.toLowerCase();

			if (this.cookiesAccepted) {
				this.$cookies.set('orderBy', 'author');
				this.$cookies.set('skillFilter', this.skillFilter);
			}

			this.listSkills();
		},
		downloadLinkClicked(skillName) {
			if (skillName in this.installedSkills) {
				return;
			}
			let self = this;
			this.axios.put(`http://${this.ip}:5000/api/v1.0.1/skills/${skillName}/`)
				.then(function(response) {
					const icon = document.getElementById(`downloadIcon_${skillName}`);
					icon.classList.remove('fa-cloud-download');
					if (response.data.success || response.data.reason === 'skill already installed') {
						icon.classList.add('fa-check');
						self.installedSkills.push(skillName);
					} else {
						icon.classList.add('fa-exclamation');
					}
				});
		},
		setFilter(input) {
			this.skillFilter = input.toLowerCase();
			if (this.cookiesAccepted) {
				this.$cookies.set('skillFilter', input);
			}
			this.listSkills();
		},
		acceptCookies() {
			this.cookieIcon = 'fad fa-cookie-bite fa-lg';
			this.showCookiesWarning = false;
			this.cookiesAccepted = true;
			this.cookiesRefused = false;
			this.$cookies.set('cookiesAccepted', true);
		},
		refuseCookies() {
			this.showCookiesWarning = false;
			this.cookiesAccepted = false;
			this.cookiesRefused = true;
			this.$cookies.set('cookiesRefused', true);
		},
		connect(e) {
			e.preventDefault();

			let self = this;
			this.connecting = true;
			this.connectingFailed = false;
			this.connected = false;
			const formData = new FormData();
			formData.append('username', this.username);
			formData.append('pin', this.pin);
			this.axios.post(`http://${self.ip}:5000/api/v1.0.1/login/`, formData)
			.then(function(response) {
				if ('apiToken' in response.data) {
					self.userToken = response.data.apiToken;
					self.connectIcon = 'fad fa-wifi fa-2x fa-fw';
					self.connected = true;
					self.connectingFailed = false;
					self.axios.defaults.headers.common['auth'] = self.userToken;
					if (self.cookiesAccepted) {
						self.$cookies.set('ip', self.ip);
						self.$cookies.set('username', self.username);
					}

					self.axios.get(`http://${self.ip}:5000/api/v1.0.1/skills/`)
						.then(function(response){
							for(const skill of response.data['data']) {
								self.installedSkills.push(skill['name']);
								const icon = document.getElementById(`downloadIcon_${skill['name']}`);
								if (icon) {
									icon.classList.remove('fa-cloud-download');
									icon.classList.add('fa-check');
								}
							}
						});

					setTimeout(() => {
						self.showConnectPanel = false;
					}, 750);
				} else {
					self.connectIcon = 'fad fa-wifi-slash fa-2x fa-fw red';
					self.connected = false;
					self.connectingFailed = true;
					self.$cookies.remove('username')
					self.$cookies.remove('ip')
				}
			}).catch(function(e) {
				console.warn(e);
				self.connectIcon = 'fad fa-wifi-slash fa-2x fa-fw red';
				self.connected = false;
				self.connectingFailed = true;
				if (self.cookiesAccepted) {
					self.$cookies.remove('username')
					self.$cookies.remove('ip')
				}
			}).finally(function() {
				self.connecting = false;
				setTimeout(() => {
					if (self.connected) {
						self.showConnectPanel = false
					}
					self.connectingFailed = false;
				}, 1500);
			});
		}
	},
	beforeMount() {
		delete this.axios.defaults.headers.common['auth'];
		if (this.$cookies.get('cookiesAccepted')) {
			this.showCookiesWarning = false;
			this.cookiesAccepted = true;
			this.cookiesRefused = false;
			this.orderBy = this.$cookies.get('orderBy') ? this.$cookies.get('orderBy') : 'name';
			this.sortDirection = this.$cookies.get('sortDirection') ? this.$cookies.get('sortDirection') : 'asc';
			this.skillFilter = this.$cookies.get('skillFilter') ? this.$cookies.get('skillFilter') : '';
			this.ip = this.$cookies.get('ip') ? this.$cookies.get('ip') : '';
			this.username = this.$cookies.get('username') ? this.$cookies.get('username') : '';
		} else if (this.$cookies.get('cookiesRefused')) {
			this.showCookiesWarning = false;
			this.cookiesAccepted = false;
			this.cookiesRefused = true;
		}
		this.getStoreData();
	}
}
