<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <div
                class="car-info-box"
                v-for="(car, index) in data"
                :key="index"
              >
                <h4><img :src="getImgUrl(car.carData.Herkunft)" :title="car.carData.Herkunft"/> {{ car.carData.Hersteller }} - {{ car.carData.Model }}</h4>
                <ul>
                    <li><label>Baujahr: </label>{{'19' + car.carData.Baujahr}}</li>
                    <li v-for="field in fields" :key="field">
                        <label>{{field}}: </label>
                        {{car.carData[field]}}
                    </li>
                </ul>
              </div>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <VueApexCharts
                type="radar"
                :options="chartOptions"
                :series="chartData"
              />
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Schließen
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
  name: "ComparisonModal",
  components: {
    VueApexCharts,
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
			fields:fields,
      chartOptions: {
        chart: {
          height: 250,
          type: "radar",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: fields,
          labels: {
            show: true,
          },
        },
        yaxis: {
          show: false,
          labels: {
            show: false,
          },
        },
        fill: {
            opacity: 0.1
        },
        markers: {
            size: 6
        },
        stroke: {
            width: 3,
        },
        tooltip: {
          enabled: true,
          y: {
            // eslint-disable-next-line no-unused-vars
            formatter: function(value,{ series, seriesIndex, dataPointIndex, w }) {
              const field = fields[dataPointIndex];
              return this.data[seriesIndex]["carData"][field];
            }.bind(this),
          },
        },
      },
    };
  },
  computed: {
    chartData: function() {
      return this.data.map((car) => {
        const normalizedData = car.normalizedData;
        const name = `${normalizedData.Hersteller} - ${normalizedData.Model}`;

        return {
          name: name,
          data: fields.map((field) => normalizedData[field]),
        };
      });
    },
  },
  methods: {
    getImgUrl(name){
      return images('./' + name + ".png")
    }
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
	height: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-header {
	min-height: 200px;
}

.modal-footer {
  min-height: 25px;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.car-info-box {
    float: left;
    border: 1px solid darkgrey;
    width: 33%;
}

.car-info-box li {
    list-style: none;
}

.car-info-box ul {
    padding: 0px;
}

.car-info-box img {
  width: 25px;
  height: 25px;
  float: left;
  margin-left: 5px;
  margin-top: -5px
}
</style>
