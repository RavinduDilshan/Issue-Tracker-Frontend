<template>
  <div>
    <Header />

    <!-- Add Case Form -->
    <div>
      <b-container>
        <b-row class="justify-content-md-center mt-4">
          <b-col col md="8">
            <b-card
              header="Add Case"
              header-bg-variant="primary"
              header-text-variant="white"
            >
              <b-card-text>
                <b-form @submit="onSubmit">
                  <!-- casename -->
                  <b-form-group label="Case Name">
                    <b-form-input v-model="casename" required></b-form-input>
                  </b-form-group>

                  <!-- description -->
                  <b-form-group label="Description">
                    <b-form-input v-model="description" required></b-form-input>
                  </b-form-group>

                  <!-- submit -->
                  <b-form-group>
                    <b-button type="submit" variant="outline-primary"
                      >Add</b-button
                    >
                  </b-form-group>
                </b-form>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./layout/Header";
export default {
  name: "AddCase",
  components: {
    Header,
  },
  data() {
    return {
      casename: "",
      description: "",
      id: this.$route.params.id,
    };
  },

  methods: {
    onSubmit() {
      event.preventDefault();
      alert(this.casename + " " + "Added Succesfully");

      // add case api call
      axios
        .post("http://localhost:3000/api/test/addcase/" + this.id, {
          casename: this.casename,
          description: this.description,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      window.location.href = "/propage/" + this.id;
    },
  },
};
</script>

<style scoped>
</style>