let storeSkills;

export default {
	name: 'Store',
	data() {
		return {
			skills: [],
			menuOpen: false,
			sortDirection: 'asc',
			orderBy: 'name',
			skillFilter: ''
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
					if (skill['name'].toLowerCase().includes(self.skillFilter)) {
						filtered.push(skill);
					}
				});
			} else {
				filtered = storeSkills;
			}


			let skills = {};
			let ordered = []
			filtered.forEach(function(skill) {
				skills[skill.name] = skill;
			});

			let keys = Object.keys(skills);
			keys.sort(function(a, b) {
				if (a.toLowerCase() < b.toLowerCase()) return -1;
				if (a.toLowerCase() > b.toLowerCase()) return 1;
				return 0;
			});

			if (this.sortDirection === 'desc') {
				keys.reverse();
			}

			keys.forEach(function(data) {
				ordered.push(skills[data]);
			});

			this.skills = ordered;
		},
		changeSortingDirection(direction) {
			this.sortDirection = direction;
			this.listSkills();
		},
		changeOrder(value)  {
			this.orderBy = value;
			this.listSkills();
		},
		setFilter(input) {
			this.skillFilter = input.toLowerCase();
			this.listSkills();
		}
	},
	beforeMount() {
		this.getStoreData();
	}
}
