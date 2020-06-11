<template>
  <div class="filter-container">
    <div class="country-select selector">
      <label class="typo__label">Herkunft</label>
      <multiselect
        v-model="country"
        :options="herkunftOptions"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Pick some"
        label="name"
        track-by="name"
        :preselect-first="true"
        @input="$emit('herkunftSelect', $event)"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }"
          ><span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} options selected</span
          ></template
        >
      </multiselect>
    </div>
    <div class="hersteller-select selector">
      <label class="typo__label">Hersteller</label>
      <multiselect
        v-model="hersteller"
        :options="herstellerOptions"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Pick some"
        label="name"
        track-by="name"
        :preselect-first="true"
        @input="$emit('herstellerSelect', $event)"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }"
          ><span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} options selected</span
          ></template
        >
      </multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "DataFilter",
  components: { Multiselect },
  data() {
    return {
      country: this.herkunftOptions,
      hersteller: this.herstellerOptions
    };
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
    herkunftOptions: Array,
    herstellerOptions: Array
  },

};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
    .selector {
        width: 30%;
        float: left;
        margin-left: 5px;
        margin-right: 5px;
    }

    .filter-container {
        width: 100%;
        height: 100px;
    }
</style>
