import { HashRouter, Route, Switch } from 'react-router-dom'

// General Pages
import { HomeErp } from '../pages/Home'

export const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={HomeErp} />
      </Switch>
    </HashRouter>
  )
}
