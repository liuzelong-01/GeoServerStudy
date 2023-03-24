<template>
  <div class="about">
    <div id="map" style="height: 100%;"></div>
  </div>
</template>
<script>
import mapJson from "@/utils/leaflet/map-json";
import leafletUtils from "@/utils/leaflet/leaflet-utils";
export default{
  created() {
    this.$nextTick(() => {
      mapJson.mapCorrection();
    
    })
  },
  async mounted(){
    await leafletUtils.readyMap()
  }
}

</script>
<style scoped>
.about{
  height: 800px!important;
}
</style>