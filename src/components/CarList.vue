<template>
  <div class="car-list-container">
    <div class="list">
      <CarCard
        v-for="(car, index) in paginatedData"
        :key="car.id + index"
        :carData="getCardData(car.id)"
        :normalizedData="car"
        @carChecked="onCarChecked($event, car.id)"
        :checked="checkedCars.includes(car.id)"
        :checkBoxDisabled="checkedCars.length === 3"
      />
    </div>
    <Paginate
      :v-model="currentPage"
      :pageCount="pageCount"
      :clickHandler="onPaginationClick"
      :prevText="'Prev'"
      :nextText="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
    </Paginate>
  </div>
</template>

<script>
import CarCard from "./CarCard";
import Paginate from "vuejs-paginate";

export default {
  name: "CarList",
  components: {
    CarCard,
    Paginate,
  },
  props: {
    carsData: Array,
    checkedCars: Array,
    onCarChecked: Function,
  },
  data() {
    return {
      currentPage: 0,
      offset: 12,
      paginatedData: [],
    };
  },
  mounted() {},
  computed: {
    pageCount: function() {
      return parseInt(this.carsData.length / this.offset);
    },
  },
  watch: {
    carsData: function() {
      this.currentPage = 0;
      const startIndex = this.currentPage * this.offset;
      this.paginatedData = this.carsData.slice(
        startIndex,
        startIndex + this.offset
      );
    },
  },
  methods: {
    getCardData(id) {
      return this.carsData.find((car) => car.id === id);
    },
    onPaginationClick(pageNum) {
      const startIndex = pageNum * this.offset;
      this.paginatedData = this.carsData.slice(
        startIndex,
        startIndex + this.offset
      );
    },
  },
};
</script>

<style scoped>
@import "../styles/pagination.css";

.car-list-container {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
}

.list {
  flex: 1;
}

.pagination {
  align-self: center;
}
</style>
