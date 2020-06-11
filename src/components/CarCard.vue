<template>
  <div class="card">
    <div class="card-container">
			<div class="card-header">
        <img :src="getImgUrl(carData.Herkunft)" :title="carData.Herkunft"/>
				<p><b>{{ carData.Hersteller }} - {{ carData.Model }}</b></p>
				<p class="year">{{'19' + carData.Baujahr}}</p>
			</div> 
      <div class="chart">
        <VueApexCharts
          type="radar"
          :options="chartOptions"
          :series="series"
        />
      </div>
			<div class="card-footer">
				<input
					type="checkbox"
					:name="carData.Hersteller + carData.Model"
					:checked="checked" @change="$emit('carChecked', $event)"
					:disabled="checkBoxDisabled && !checked"
				/>
			</div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
const fields = [
  "Verbrauch",
  "Hubraum",
  "PS",
  "Gewicht",
  "Beschleunigung",
  "Zylinder",
];
const images = require.context('../assets/', false, /\.png$/)

export default {
  name: "CarCard",
  components: {
    VueApexCharts,
	},
  props: {
		checked: Boolean ,
		checkBoxDisabled: Boolean,
    carData: {
      type: Object,
      default: null,
    },
    normalizedData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      series: [
        {
          name: "Series 1",
          data: this.getChartData(),
        },
      ],
      chartOptions: {
        chart: {
          height: 250,
          type: "radar",
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: fields,
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          marker: {
            show: false,
          },
          y: {
            // eslint-disable-next-line no-unused-vars
            formatter: function(value,{ series, seriesIndex, dataPointIndex, w }) {
              const field = fields[dataPointIndex];
              return this.carData[field];
            }.bind(this),
            title: {
              formatter: () => "",
            },
          },
        },
      },
    };
  },
  methods: {
    getChartData() {
      const car = this.normalizedData;
      return [
        car["Verbrauch"],
        car["Hubraum"],
        car["PS"],
        car["Gewicht"],
        car["Beschleunigung"],
        car["Zylinder"],
      ];
		},
    getImgUrl(name){
      return images('./' + name + ".png")
    }
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 15%;
  min-width: 150px;
  float: left;
  margin: 0.75rem;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}

.card-header {
	height: 40px;
}

.card-header p {
	text-align: center;
	margin-top: 5px;
	margin-bottom: 5px;
}

.card-header h4 {
	margin-top: 10px;
	margin-bottom: 10px;
}

.card-header b {
	font-weight: 500;
}

.card-header img {
  width: 25px;
  height: 25px;
  float: left;
  margin-left: 5px;
}

.card-header .year {
  font-size: 14px;
}
</style>
