<template>
  <div>
    <div>
      <a-row :span="24" style="border-bottom: 1px solid rgb(235, 237, 240)">
        <a-icon type="tag" style="margin-bottom: 10px" /> All categories
      </a-row>
    </div>
    <!-- <div>
      <a-collapse @change="changeActivekey">
        <a-collapse-panel key="1" header="Drafts">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Assigned" :disabled="false">
          <a-collapse default-active-key="4">
            <a-collapse-panel key="4" header="Essay on">
              <p>{{ text }}</p>
            </a-collapse-panel>
          </a-collapse>
          <a-collapse default-active-key="5">
            <a-collapse-panel key="5" header="This is panel nest panel">
              <p>{{ text }}</p>
            </a-collapse-panel>
          </a-collapse>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="Retruned">
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div> -->
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Drafts"> Content of Tab Pane 1 </a-tab-pane>
        <a-tab-pane key="2" tab="Assigned" force-render>
          <a-card style="width: 100%">
            <a-row>
              <a-row :span="24">
                <a-col :span="12" style="font-weight: bold">Essay on Cow</a-col>
                <a-col :span="12">0 / 11 turned in</a-col>
              </a-row>
              <a-row :span="24">
                <a-col :span="12">Due November 16, 2023 8:59 PM </a-col>
                <a-col :span="12">
                  <a-progress
                    :percent="0"
                    :show-info="false"
                    :stroke-width="5"
                  />
                </a-col>
              </a-row>
            </a-row>
          </a-card>
          <br />
          <a-card style="width: 100%">
            <a-row>
              <a-row :span="24">
                <a-col :span="12" style="font-weight: bold"
                  >Blog on Vue JS</a-col
                >
                <a-col :span="12">8 / 10 turned in</a-col>
              </a-row>
              <a-row :span="24">
                <a-col :span="12">Due November 16, 2023 8:59 PM </a-col>
                <a-col :span="12">
                  <a-progress :percent="80" :show-info="false" :stroke-width="5"
                    >8 turned</a-progress
                  >
                </a-col>
              </a-row>
            </a-row>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Returned"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
export default {
  //For using dropdown
  //   data() {
  //     return {
  //       text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
  //     };
  //   },
  //   methods: {
  //     changeActivekey(key) {
  //       console.log(key);
  //     },
  //   },

  data() {
    return {};
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>
