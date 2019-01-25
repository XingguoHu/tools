import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    $request: (
      url: string,
      method: string,
      params?: RequstParams
    ) => Promise<any>;
  }
}
