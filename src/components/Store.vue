<template>
  <div id="Store">
    <div class="menuOverlay">
      blabal
    </div>
    <header>
      <div class="title">
        Project Alice skill store
      </div>
      <div class="description">
        For every task there's a skill and if not, we can make it
      </div>
      <div class="menu">
        <i class="fad fa-bars"></i>
      </div>
    </header>
    <div class="storeContainer">
      <ul id="storeSkills">
        <li v-for="skill in skills" :key="skill">
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
import storeData from '../data.json';

export default {
  name: 'Store',
  data() {
    return {
      skills: storeData
    }
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
  .menuOverlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--secondary);
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
    min-width: 20%;
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
    top: 15px;
    right: 15px;
    font-size: 3em;
    cursor: pointer;
    transition: all .1s ease-in-out;
  }
  .menu:hover {
    font-size: 3.2em;
  }
</style>
