<template>
  <div id="Store">
    <header>
      <div class="title">
        Project Alice skill store
      </div>
      <div class="description">
        For every task there's a skill and if not, we can make it
      </div>
      <div class="menu">
        <i class="fad fa-bars " v-on:click="menuOpen = !menuOpen" :class="[menuOpen ? 'fad fa-times' : 'fad fa-bars']"></i>
        <transition name="expandMenu" mode="out-in">
          <div class="menuContainer" v-bind:class="{menuContainerOpen: menuOpen}">
            <div class="menuItem">
              <a class="menuLink" href="https://github.com/project-alice-assistant" title="Github">
                <i class="fab fa-github"></i>
              </a>
              <a class="menuLink" href="https://discord.gg/C6HNtzV" title="Discord">
                <i class="fab fa-discord"></i>
              </a>
              <a class="menuLink" href="https://docs.projectalice.io/" title="Documentation">
                <i class="fad fa-book-alt"></i>
              </a>
            </div>
          </div>
        </transition>
      </div>
    </header>
    <div class="storeContainer">
      <ul id="storeSkills">
        <li v-for="skill in skills" :key="skill.name" v-on:click="grow($event)">
          <div class="skillIcon">
            <i :class="skill.icon"></i>
          </div>
          <div class="skillInfos">
            <div class="skillName">{{ skill.name }}</div>
            <div class="skillDescription">{{ skill.desc }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Store',
  data() {
    return {
      skills: [],
      menuOpen: false
    }
  },
  methods: {
    getStoreData() {
      fetch('https://skills.projectalice.io/assets/store/master.json')
          .then(response => response.json())
          .then(data => (this.skills = this.sortedStore(data)));
    },
    grow(event) {
      console.log(event);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    sortedStore(data) {
      let keys = Object.keys(data).sort();
      let orderedSkills = [];
      keys.forEach(function(skillName) {
        orderedSkills.push(data[skillName])
      });
      return orderedSkills;
    }
  },
  beforeMount() {
    this.getStoreData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Store {
    width: 100%;
    overflow: hidden;
    margin: 0;
    display: flex;
    flex-flow: row;
    align-items: stretch;
  }
  .title {
    box-sizing: border-box;
    font-size: 2.5em;
    text-align: center;
    margin-top: 15px;
  }
  .description {
    font-family: var(--readable);
    font-size: 1em;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .storeContainer {
    width: 100%;
    height: 100%;
    margin-top: 100px;
    padding: 50px;
  }
  ul {
    display: flex;
    align-content: center;
    justify-content: center;
    list-style: none;
    flex-direction: row;
    flex-wrap: wrap;
  }
  li {
    width: 20%;
    min-width: 150px;
    height: 350px;
    background-color: var(--secondary);
    margin: 15px;
    flex-shrink: 0;
    font-family: var(--readable);
    cursor: pointer;
    transition: all .3s ease-in-out;
  }
  li:hover {
    -webkit-box-shadow: 6px 6px 25px 0 rgba(128,128,128,1);
    -moz-box-shadow: 6px 6px 25px 0 rgba(128,128,128,1);
    box-shadow: 6px 6px 25px 0 rgba(128,128,128,1);
    transform: translate3d(-5px, -5px, 0px);
  }
  .skillInfos {
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
  }
  .skillIcon {
    width: 100%;
    text-align: center;
    font-size: 5em;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    height: 125px;
    background-color: var(--mainBG);
  }
  .skillName {
    width: 100%;
    text-align: center;
    font-size: 1.1em;
    font-weight: bold;
    margin-top: 15px;
    overflow: hidden;
  }
  .skillDescription {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1em;
    text-align: center;
    overflow: hidden;
  }
  .menu {
    position: absolute;
    top: 55px;
    right: 15px;
    font-size: 3em;
    cursor: pointer;
    transition: all .1s ease-in-out;
    width: 100px;
    text-align: right;
  }
  .fa-bars:hover {
    font-size: 1.1em;
  }
  .menuContainer {
    width: 0;
    height: 0;
    margin-top: 20px;
    display: none;
  }
  .menuContainerOpen {
    transition: width 1s ease-out;
    width: 100px;
    transition-property: width;
    display: block;
  }
  .menuLink {
    display: block;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .menuLink:hover {
    color: yellow;
  }
</style>
