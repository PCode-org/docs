declare module '@site/data/activity-metrics.json' {
  export interface ActivityMetricsData {
    lastUpdated: string;
    dockerHub: {
      pullCount: number;
      repository: string;
    };
    clarity: {
      activeUsers: number;
      activeSessions: number;
      dateRange: string;
    };
  }
  const data: ActivityMetricsData;
  export default data;
}
