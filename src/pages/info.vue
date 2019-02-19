<template>
<f7-page class="bg">
  <f7-navbar class="nav navbar no-shadow no-hairline" back-link="Back">
    <f7-nav-title class="nav-title title heading"> {{ bossName }}</f7-nav-title>
  </f7-navbar>
  <div class="blurfilter">
    <div class="blur-content"></div>
  </div>

  <f7-block>
    <p class="content-shadow p-serif white description"> {{ bossDescription}}</p>
    <f7-button class="img-trigger">
      <f7-card v-for="npc in npcs" :key="npc.npcId" class="boss-card-container">
        <span @click="selectItem(npc)">
          <f7-card-header class="no-border boss-card subheading no-hairline" valign="bottom" :style="'background-image:url(' + npc.npcImg + ');'">
            {{ npc.npcName }}
          </f7-card-header>
        </span>
      </f7-card>
    </f7-button>
  </f7-block>

  <f7-actions class="img-container" ref="actionsOneGroup">
    <f7-actions-group v-if="selectedNpc">
      <img :src="selectedNpc.npcImg" class="boss-image">
    </f7-actions-group>
  </f7-actions>

</f7-page>
</template>

<script>
import axios from 'axios'
import {
  bus
} from '../app'

let uuid = 0;
export default {
  data() {
    return {
      id: this.$f7route.params.id,
      bossName: '',
      bossDescription: '',
      npcs: [],
      selectedNpc: null,
    }
  },
  created() {
    this.getBossInfo()
  },
  methods: {
    selectItem: function(npc) {
      this.$refs.actionsOneGroup.open();
      this.selectedNpc = npc
    },
    getBossInfo() {
      const url = 'https://eu.api.blizzard.com/wow/zone/8443?locale=en_GB&access_token=';
      let accessToken = '';
      let vm = this;
      fetch("https://us.battle.net/oauth/token", {
        body: "grant_type=client_credentials",
        headers: {
          Authorization: "Basic YWY4ZjgxOGMyMTJmNDI4ZDhmYjVjMTA2ZjhiYjZiYmU6Qlo5REp1WU5keG1MRTFsM1oyaWtQNVlzaEh1cEN4Zko=",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        accessToken = data.access_token.toString();
        let currentId = parseInt(vm.id, 10);
        let npcIsShort = false;
        axios.get(url + accessToken)
          .then(function(data) {
            let bossArray = data.data.bosses;
            let result = bossArray.find(o => o.id === currentId);
            vm.bossName = result.name;
            vm.bossDescription = result.description;
            result.npcs.forEach(function(npc) {
              let npcInfo = {
                npcId: npc.id,
                npcName: npc.name,
                npcImg: 'https://render-eu.worldofwarcraft.com/npcs/zoom/creature-display-' + npc.creatureDisplayId + '.jpg',
              };
              vm.npcs.push(npcInfo);
            })
          })
      }).catch(error => console.error(error));
    }
  }
}
</script>

<style media="screen" scoped>
.boss-card-container {
  border-radius: 10px;
}

.boss-card {
  height: 80px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: 300px auto;
  background-color: #181818;
  background-position: right -70px top -15px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);
  letter-spacing: 0.8px;
  border-radius: 0;
}

.nav-title {
  font-size: 25px;
  padding-left: 5px !important;
  margin-left: 0 !important;
  text-overflow: clip;
}

.description {
  line-height: 25px;
}

.img-trigger {
  height: 100%;
  text-decoration: none;
  text-transform: capitalize;
}

.img-container {
  background-color: #181818;
  color: #fff;
  max-height: 350px;
}

.boss-image {
  max-height: 300px;
  width: auto;
  margin: auto;
  padding: 10px;
  display: block;
  margin: auto;
}
</style>
