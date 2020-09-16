<template>
  <div id="Store">
    <header>
      <div class="title">
        Project Alice skill store
      </div>
      <div class="description">
        For every task there's a skill and if not, we can make it
      </div>
    </header>
    <div class="storeContainer">
      <ul id="storeSkills">
        <li v-for="skill in skills" :key="skill">
          <div class="skillIcon">
            <font-awesome-icon :icon="skill.icon"></font-awesome-icon>
          </div>
          <div>{{ skill.name }}</div>
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
    flex-flow: column;
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
    list-style: none;
    flex-direction: row;
    flex-wrap: wrap;
  }
  li {
    width: 300px;
    height: 350px;
    background-color: var(--secondary);
    margin: 15px;
    flex-shrink: 0;
    font-family: var(--readable);
  }
  .skillIcon {
    width: 100%;
    text-align: center;
  }
</style>
