<template>
  <div>
    <Header />
    <div class="pageComponent">
      <br />
      <h1>Case Id {{ id }}</h1>
      <b-container>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          veritatis maxime similique ipsa illo voluptatibus unde fugiat vitae
          fuga. Itaque aspernatur ducimus, alias dicta repellat nam ab fugit
          quasi enim!
        </p>
      </b-container>
      <h1>Issues of this case</h1>
      <b-button v-on:click="redirect" variant="danger">Add Issue</b-button>

      <br />
      <br />

      <!-- issue details table -->
      <div>
        <table style="width: 100%">
          <tr>
            <th>Issue Name</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          <tr v-for="item in list" v-bind:key="item.issueId">
            <td>{{ item.issueName }}</td>
            <td>{{ state.value }}</td>
            <td>{{ item.description }}</td>

            <td>
              <a v-bind:href="'/issue/' + item.issueId">View</a>
              <b-button
                class="btn"
                variant="success"
                size="sm"
                @click="actionService.send('start')"
                >Start</b-button
              >
              <b-button
                class="btn"
                variant="danger"
                size="sm"
                @click="actionService.send('cancel')"
                >Cancel</b-button
              >
              <b-button
                class="btn"
                size="sm"
                variant="primary"
                @click="actionService.send('complete')"
                >Complete</b-button
              >
              <b-button
                class="btn"
                variant="info"
                size="sm"
                @click="actionService.send('holding')"
                >Hold</b-button
              >
              <b-button
                class="btn"
                variant="warning"
                size="sm"
                @click="actionService.send('resume')"
                >Resume</b-button
              >
            </td>
          </tr>
        </table>
      </div>
    </div>

    <br />

    <!-- comment section -->

    <div class="commentbox">
      <b-container>
        <b-card
          header="Add comment about this Case"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text>
            <b-form @submit="onSubmit">
              <!-- comment -->
              <b-form-group label="Comment Here">
                <b-form-input v-model="comment" required></b-form-input>
              </b-form-group>

              <!-- submit -->
              <b-form-group>
                <b-button type="submit" variant="outline-primary"
                  >Submit</b-button
                >
              </b-form-group>
            </b-form>
          </b-card-text>
        </b-card>
      </b-container>
    </div>

    <br />

    <!-- comments table -->
    <div class="viewcomments">
      <b-container>
        <div>
          <table style="width: 100%">
            <tr>
              <th>Commenter</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
            <tr v-for="item in commentlist" v-bind:key="item.projectcmtId">
              <td>{{ item.commenter }}</td>
              <td>{{ item.comment }}</td>
              <td>Reply</td>
            </tr>
          </table>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./layout/Header";
import { fetchMachine } from "./StateMachine/machine";
import { interpret } from "xstate";
export default {
  name: "CasePage",
  components: {
    Header,
  },

  mounted() {
    // get issues request
    axios
      .get("http://localhost:3000/api/test/issues/" + this.id)
      .then((response) => {
        console.log(response.data);
        this.list = response.data;
        console.log(this.id);
      })
      .catch((err) => {
        console.log(err);
      });

    // get case comments request
    axios
      .get("http://localhost:3000/api/test/getcasecomments/" + this.id)
      .then((response) => {
        console.log(response.data);
        this.commentlist = response.data;
        console.log(this.id);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  data() {
    return {
      comment: "",
      list: [],
      id: this.$route.params.id,
      commenter: localStorage.getItem("user"),
      commentlist: [],

      actionService: interpret(fetchMachine),
      state: fetchMachine.initialState,
    };
  },
  methods: {
    redirect: function () {
      window.location.href = "/addissue/" + this.id;
    },

    onSubmit() {
      event.preventDefault();
      alert(this.comment + " " + "Added Succesfully");

      // add comment request
      axios
        .post("http://localhost:3000/api/test/addcasecomment/" + this.id, {
          comment: this.comment,
          commenter: this.commenter,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      window.location.href = "/case/" + this.id;
    },
  },

  created() {
    this.actionService.onTransition((state) => (this.state = state)).start();
  },

  destroyed() {
    this.actionService.stop();
  },
};
</script>

<style  scoped>
.pageComponent {
  text-align: center;
}

table,
th,
td {
  border: 1px solid black;
}

.btn {
  margin-right: 10px;
}

a{
  margin-right: 10px;
}
</style>