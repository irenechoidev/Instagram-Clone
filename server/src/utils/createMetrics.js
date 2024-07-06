const { MeterRegistry } = require('@opentelemetry/metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

exports.createMetrics = () => {
  const exporter = setUpPrometheus();
  const meterName = 'instagram-clone-meter';
  const meter = new MeterRegistry().getMeter(meterName);
  meter.addExporter(exporter);

  // define metrics
  const requestCountData = getRequestCountData();
  const requestCount = meter.createCounter(
    requestCountData.name,
    requestCountData.metadata
  );

  const labels = meter.labels({});

  return {
    requestCount,
    labels,
  };
};

const setUpPrometheus = () => {
  const prometheusPort = 8081;
  const prometheusEndpoint = '/metrics';

  const exporter = new PrometheusExporter(
    {
      port: prometheusPort,
      startServer: true,
    },
    () => {
      console.log('Connected to prometheus on port', prometheusPort);
      console.log('Connected to prometheus endpoint', prometheusEndpoint);
    }
  );

  return exporter;
};

const getRequestCountData = () => {
  return {
    name: 'request_count',
    metadata: {
      description: 'Counts total number of requests',
    },
  };
};
