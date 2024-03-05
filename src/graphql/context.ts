import { Tasks } from '../datasources/tasks'

export type DataSourceContext = {
  dataSources: {
    tasks: Tasks
  }
}
