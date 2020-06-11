<template>
  <div id="app">
    <header>
      <DataFilter
        :data="carsData"
        :herkunftOptions="getCountrys(carsData)"
        :herstellerOptions="getHersteller(carsData)"
        @herkunftSelect="onHerkunftSelect($event)"
        @herstellerSelect="onHerstellerSelect($event)"
      />
      <button
        id="show-modal"
        @click="showComparisonModal = true"
        :disabled="checkedCars.length < 2"
      >
        Ausgewählte Autos Vergleichen
      </button>
    </header>
    <CarCard
      v-for="(car, index) in filteredCarsData"
      :key="car.id+index"
      :carData="getCardData(car.id)"
      :normalizedData="car"
      @carChecked="onCarChecked($event, car.id)"
      :checked="checkedCars.includes(car.id)"
      :checkBoxDisabled="checkedCars.length === 3"
    />
    <ComparisonModal
      v-if="showComparisonModal"
      @close="showComparisonModal = false"
      :data="comparisonModalData"
    />
  </div>
</template>

<script>
import CarCard from "./components/CarCard";
import DataFilter from "./components/Filter";
import ComparisonModal from "./components/ComparisonModal";
const carsDE = require("./assets/carsDE.csv");

export default {
  name: "App",
  components: {
    CarCard,
    ComparisonModal,
    DataFilter,
  },
  data() {
    return {
      carsData: carsDE,
      normalizedCarData: [],
      checkedCars: [],
      showComparisonModal: false,
      selectedHersteller: this.getHersteller(carsDE),
      selectedHerkunft: this.getCountrys(carsDE),
      filteredCarsData: [],
    };
  },
  computed: {
    comparisonModalData: function() {
      return this.checkedCars.map((carId) => ({
        carData: this.carsData.find(car => car.id === carId),
        normalizedData: this.normalizedCarData.find(car => car.id === carId),
      }));
    }
  },
  mounted() {
    this.carsData = this.carsData.map(car => ({...car, id: car.Hersteller+car.Model}))
    this.normalizedCarData = this.normalizeCarData(carsDE);
    this.filterData()
  },
  methods: {
    getCardData(id) {
        return this.carsData.find(car => car.id === id)
    },
    onCarChecked(event, carId) {
      const checked = event.target.checked;
      if (checked && this.checkedCars.length < 3) {
        this.checkedCars.push(carId);
      } else {
        this.checkedCars = this.checkedCars.filter((car) => car !== carId);
      }
    },
    filterData() {
      const countrys = this.selectedHerkunft.map((el) => el.name);
      const hersteller = this.selectedHersteller.map((el) => el.name);
      const filtered = this.normalizedCarData
        .filter((el) => countrys.includes(el.Herkunft))
        .filter((el) => hersteller.includes(el.Hersteller));
      this.filteredCarsData.splice(0, this.filteredCarsData.length, ...filtered)
    },
    normalizeCarData(dataSet) {
      // make deep copy of data
      let normalizedCarData = JSON.parse(JSON.stringify(dataSet));
      const relevantHeaders = [
        "Verbrauch",
        "Hubraum",
        "PS",
        "Gewicht",
        "Beschleunigung",
        "Zylinder",
      ];

      relevantHeaders.map((field) => {
        const fieldData = normalizedCarData
          .map((el) => el[field])
          .filter((value) => typeof value === "number");

        const ratio = Math.max(...fieldData) / 100;
        normalizedCarData.forEach((car) => {
          if (typeof car[field] === "number") {
            car[field] = car[field] / ratio;
          } else {
            car[field] = 0;
          }
        });
      });

      return normalizedCarData.map(car => ({...car, id: car.Hersteller+car.Model}))
    },
    getCountrys(carsData) {
      return carsData
        .map((car) => car.Herkunft)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((country) => ({ name: country }));
    },
    getHersteller(carsData) {
      return carsData
        .map((car) => car.Hersteller)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((hersteller) => ({ name: hersteller }));
    },
    onHerkunftSelect(event) {
      this.selectedHerkunft = event;
      this.filterData()
    },
    onHerstellerSelect(event) {
      this.selectedHersteller = event;
      this.filterData()
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
