import { compose, withHandlers, lifecycle } from 'recompose'

const withForm = compose(withHandlers({}), lifecycle({}))

export default withForm
