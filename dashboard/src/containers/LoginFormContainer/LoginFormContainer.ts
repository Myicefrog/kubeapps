import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import actions from "../../actions";
import LoginForm from "../../components/LoginForm";
import { IStoreState } from "../../shared/types";

function mapStateToProps({
  auth: { authenticated, authenticating, authenticationError },
  config: { authProxyEnabled, oauthLoginURI, featureFlags, appVersion },
}: IStoreState) {
  return {
    authenticated,
    authenticating,
    authenticationError,
    oauthLoginURI: authProxyEnabled ? oauthLoginURI : "",
    UI: featureFlags.ui,
    appVersion,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, Action>) {
  return {
    authenticate: (token: string) => dispatch(actions.auth.authenticate(token, false)),
    checkCookieAuthentication: () => dispatch(actions.auth.checkCookieAuthentication()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
