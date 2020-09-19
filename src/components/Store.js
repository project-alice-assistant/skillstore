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
			showCookiesWarning: true
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
			this.listSkills();
		},
		changeOrder(value)  {
			this.orderBy = value.toLowerCase();
			this.listSkills();
		},
		authorLinkClicked(author)  {
			this.orderBy = 'author';
			this.skillFilter = author.toLowerCase();
			this.listSkills();
		},
		downloadsLinkClicked(number)  {
			this.orderBy = 'downloads';
			this.skillFilter = number;
			this.listSkills();
		},
		setFilter(input) {
			this.skillFilter = input.toLowerCase();
			this.listSkills();
		},
		acceptCookies() {
			this.cookieIcon = 'fad fa-cookie-bite fa-lg';
			this.showCookiesWarning = false;
		},
		refuseCookies() {
			this.showCookiesWarning = false;
		}
	},
	beforeMount() {
		console.log(this.$cookies.get('alicestore'));
		this.getStoreData();
	}
}
