<template>
  <client-only>
    <div>
      <HeaderTab icon="mdi-chart-bar" back="/dashboard" />
      <HeaderTitle icon="report" title="สรุปผล" />
      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-col>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="เลือกวันที่"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              range
              locale="th-th"
              scrollable
              color="deep-purple darken-1"
            >
              <v-spacer></v-spacer>
              <v-btn text color="deep-purple darken-1" @click="modal = false">
                ยกเลิก
              </v-btn>
              <!-- <v-btn text color="deep-purple darken-1"> ตกลง </v-btn> -->
              <v-btn text color="deep-purple darken-1" @click="changeDate">
                ตกลง
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-select :items="options" label="เลือกรายการกิจกรรม" outlined></v-select>
      <v-card>
        <v-card-text class="mb-16">
          <line-chart
            :chart-options="chartOptions"
            :chart-data="chartData"
            chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
          />
        </v-card-text>
      </v-card>
    </div>
  </client-only>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 300,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    interaction: {
      type: Object,
      default: () => {},
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    let delayed;
    return {
      dates: [null, null],
      items: [],
      options: [],
      modal: false,
      date: null,
      dateFrom: "2022-10-10",
      dateTo: "2022-10-16",
      label: "",
      chartData: {},
      chartOptions: {
        interaction: {
          mode: "index",
          intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "กราฟแสดงรายละเอียด",
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
      },
    };
  },
  async fetch() {
    const { data } = await this.$store.dispatch("record/target/activity");
    this.items = data;
    this.options = data.map((item) => item.subject);
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  async created() {
    const data = await this.$store.dispatch("report/find", {
      dateFrom: "2022-10-10",
      dateTo: "2022-10-16",
      label: "ดื่มน้ำ",
    });

    this.chartData = {
      labels: data.labels,
      datasets: data.datasets,
    };
  },
  methods: {
    changeDate() {
      this.items = [];
      this.modal = false;
      this.$refs.dialog.save(this.date);
      this.$store
        .dispatch("record/find", {
          dateFrom: this.dates[0],
          dateTo: this.dates[1],
          label: this.options[0],
        })
        .then((response) => {
          this.count = response.length;
          this.items = response;
        });
    },
  },
};
</script>
