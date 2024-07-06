const { MeterRegistry } = require('@opentelemetry/metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { aggregatePostMetrics } = require('./postMetrics');

exports.createMetrics = () => {
  const exporter = setUpPrometheus();
  const meterName = 'instagram-clone-meter';
  const meter = new MeterRegistry().getMeter(meterName);
  meter.addExporter(exporter);

  const postMetrics = aggregatePostMetrics(meter);
  const labels = meter.labels({});

  return {
    ...postMetrics,
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
