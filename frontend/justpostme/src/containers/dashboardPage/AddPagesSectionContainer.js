import { connect } from "react-redux";
import { addUser } from "../../actions/user";
import AddPagesSection from "../../components/dashboardPage/AddPagesSection";

const mapStateToProps = state => ({
  pages: state.unmanagedPages.pages,
  // pages: [{ name: "dsfsdfsd" }],
  loading: state.unmanagedPages.loading,
  error: state.unmanagedPages.error,
  userID: state.userMeta.id
});

export default connect(mapStateToProps)(AddPagesSection);
