<!-- <template>
	<div id="map" class="fen"> 
	</div>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		mounted(){
			this.showMap();
		},
		methods:{
			showMap(){
				let timer = setTimeout(function(){
					let map = new BMap.Map("map");
					map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
					map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_SMALL}));
					map.enableScrollWheelZoom();

					clearTimeout(timer);
				},0);
			}	
		}
	}
</script>
<style scoped>
	#map{
		width: calc(100% - 20px);
		height: calc(92vh - 56px);
		margin: 10px auto;
		border: 1px solid #dbdbdb;

	}
</style> -->