import { connect } from "react-redux";
import MyPagesSection from "../../components/dashboardPage/MyPagesSection";
import { removeFromManagedServer } from "../../actions/removeManagedPage";
import { fetchManagedPages } from "../../actions/managedPages";

const mapStateToProps = state => ({
  pages: state.managedPages.pages,
  loading: state.managedPages.loading,
  error: state.managedPages.error,
  removingPage: state.removeManagedPage.loading,
  userID: state.userMeta.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  removeFromManaged: id => dispatch(removeFromManagedServer(id)),
  fetchManagedPages: userId => dispatch(fetchManagedPages(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPagesSection);
