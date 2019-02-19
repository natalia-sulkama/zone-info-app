<template>
<f7-page class="bg">
  <f7-navbar class="nav navbar no-shadow no-hairline">
    <f7-nav-title class="nav-title title heading"> {{ raidData.name }}</f7-nav-title>
  </f7-navbar>
  <div class="blurfilter">
    <div class="blur-content"></div>
  </div>

  <f7-block>
    <p class="content-shadow p-serif white description"> {{ raidData.description }} </p>
  </f7-block>

  <f7-list accordion-list class="boss-lists">
    <f7-list-item accordion-item class="heading white item-title content-shadow" title="Lower Karazhan">
      <f7-accordion-content>
        <f7-list>
          <f7-list-item v-for="lowerBoss in lowerBosses" :key="lowerBoss.id">
            <f7-link @click="$f7router.navigate('/info/' + JSON.stringify(lowerBoss.id))" class="single-boss subheading white"> <span class="list-icon">&prurel;</span> {{ lowerBoss.name }} </f7-link>
          </f7-list-item>
        </f7-list>
      </f7-accordion-content>
    </f7-list-item>
    <f7-list-item accordion-item class="heading white item-title content-shadow" title="Karazhan Tower">
      <f7-accordion-content>
        <f7-list>
          <f7-list-item v-for="upperBoss in upperBosses" :key="upperBoss.id">
            <f7-link @click="$f7router.navigate('/info/' + JSON.stringify(upperBoss.id))" class="single-boss subheading white"><span class="list-icon">&prurel;</span> {{ upperBoss.name }} </f7-link>
          </f7-list-item>
        </f7-list>
      </f7-accordion-content>
    </f7-list-item>
  </f7-list>
</f7-page>
</template>

<script>
import axios from 'axios'
import {
  bus
} from '../app'

export default {
  data() {
    return {
      raidData: '',
      lowerBosses: [],
      upperBosses: []
    }
  },
  created() {
    this.getRaidData()
  },
  methods: {
    getRaidData() {
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
        axios.get(url + accessToken)
          .then(function(data) {
            vm.raidData = data.data;
            vm.lowerBosses = data.data.bosses.slice(0, 7);
            vm.upperBosses = data.data.bosses.slice(7, 10);
          });
      }).catch(error => console.error(error));
    }
  }
}
</script>

<style media="screen" scoped>
.single-boss {
  color: #fff;
}

.list-icon {
  color: rgb(224, 132, 47);
  padding-right: 5px;
}

.item-title {
  letter-spacing: 1px;
  font-size: 23px;
  text-shadow: 2px 2px 8px #000;
  border-radius: 5px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
}

.boss-lists {
  width: 90%;
  margin: auto;
}
</style>
