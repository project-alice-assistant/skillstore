let storeSkills;

export default {
	name: 'Store',
	data() {
		return {
			skills: [],
			menuOpen: false,
			sortDirection: 'asc'
		}
	},
	methods: {
		getStoreData() {
			let self = this;
			fetch('https://skills.projectalice.io/assets/store/master.json')
				.then(response => response.json())
				.then(function(data) {
					storeSkills = data;
					self.orderSkills();
				});
		},
		toggleMenu() {
			this.menuOpen = !this.menuOpen;
		},
		orderSkills(by = 'name') {
			let keys;
			if (by === 'name') {
				keys = this.sort(storeSkills);
			}
			else if (by === 'author') {
				let tempDict = {};
				for (const skill of Object.values(storeSkills)) {
					let author = skill['author'];
					if (!(author in tempDict)) {
						tempDict[author] = []
					}
					tempDict[author].push(skill);
				}
				keys = this.sort(tempDict);
				keys.forEach(function(authorName) {
					let list = tempDict[authorName];
					let subDict = {};
					list.forEach(function(skill) {
						subDict[skill['name']] = skill;
					});
					console.log(subDict)
					//let sortedSubKeys = this.sort(subDict);
					//console.log(sortedSubKeys);
				})
			}

			let orderedSkills = [];
			keys.forEach(function(skillName) {
				orderedSkills.push(storeSkills[skillName])
			});
			this.skills = orderedSkills;
		},
		changeSortingDirection(direction) {
			this.sortDirection = direction;
			this.orderSkills();
		},
		changeOrder(value)  {
			this.orderSkills(value);
		},
		sort(dict) {
			let keys = Object.keys(dict);
			keys.sort(function(a, b) {
				if (a.toLowerCase() < b.toLowerCase()) return -1;
				if (a.toLowerCase() > b.toLowerCase()) return 1;
				return 0;
			});
			if (this.sortDirection === 'desc') {
				keys.reverse();
			}
			return keys;
		}
	},
	beforeMount() {
		this.getStoreData();
	}
}
