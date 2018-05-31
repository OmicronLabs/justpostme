import { connect } from "react-redux";
import { addToManagedServer } from "../../actions/addManagedPage";
import { fetchUnmanagedPages } from "../../actions/unmanagedPages";
import AddPagesSection from "../../components/dashboardPage/AddPagesSection";

const mapStateToProps = state => ({
  pages: state.unmanagedPages.pages,
  loading: state.unmanagedPages.loading,
  error: state.unmanagedPages.error,
  userID: state.userMeta.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  addPageToManaged: id => dispatch(addToManagedServer(id)),
  fetchUnmanagedPages: userId => dispatch(fetchUnmanagedPages(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPagesSection);
