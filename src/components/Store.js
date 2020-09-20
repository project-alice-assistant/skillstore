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
			connectPanelHidden: false,
			userToken: '',
			ip: '',
			username: '',
			pin: ''
		}
	},
	methods: {
		getStoreData() {
			let self = this;
			fetch('https://skills.projectalice.io/assets/store/master.json')
				.then(response => response.json())
				.then(function(data) {
					storeSkills = Object.values(data);
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
					skills[skill[self.orderBy].toString()] = [];
				}
				skills[skill[self.orderBy].toString()].push(skill);
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
			list.sort(function(a, b) {
				if (a.toLowerCase() < b.toLowerCase()) return -1;
				if (a.toLowerCase() > b.toLowerCase()) return 1;
				return 0;
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
		downloadsLinkClicked(number)  {
			this.orderBy = 'downloads';
			this.skillFilter = number;

			if (this.cookiesAccepted) {
				this.$cookies.set('orderBy', 'downloads');
				this.$cookies.set('skillFilter', this.skillFilter);
			}

			this.listSkills();
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
			this.$cookies.set('visited', true);
		},
		refuseCookies() {
			this.showCookiesWarning = false;
			this.cookiesRefused = false;
		},
		connect() {
			let self = this
			fetch(`http://${this.ip}:5000/api/v1.0.1/login/`, {
				method: 'POST',
				cache: 'no-store',
				body: JSON.stringify({
					'username': this.username,
					'pin': this.pin
				})
			}).then(response => response.json())
			.then(function(data) {
				if ('apiToken' in data) {
					self.userToken = data.apiToken;
				}
			});
		}
	},
	beforeMount() {
		if (this.$cookies.get('visited')) {
			this.showCookiesWarning = false;
			this.cookiesAccepted = true;
			this.orderBy = this.$cookies.get('orderBy') ? this.$cookies.get('orderBy') : 'name';
			this.sortDirection = this.$cookies.get('sortDirection') ? this.$cookies.get('sortDirection') : 'asc';
			this.skillFilter = this.$cookies.get('skillFilter') ? this.$cookies.get('skillFilter') : '';
		}
		this.getStoreData();
	}
}
