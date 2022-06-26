import apm from "elastic-apm-node";
import { EnvVars, Logger } from ".";

export const APM = (() => {
  let apmInstance: apm.Agent;

  const initApm = () => {
    apmInstance = apm.start({
      active: EnvVars.APM_ENABLE,
      serviceName: EnvVars.ES_INDEX,
      serverUrl: EnvVars.APM_URL
    });

    Logger.info("APM started");
  };

  return {
    getApm: () => {
      if (!apmInstance) {
        initApm();
      }

      return apmInstance;
    }
  };
})();
