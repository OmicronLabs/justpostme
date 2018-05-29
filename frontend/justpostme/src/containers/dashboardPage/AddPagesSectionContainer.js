import { connect } from "react-redux";
import { addUser } from "../../actions/user";
import AddPagesSection from "../../components/dashboardPage/AddPagesSection";

const mapStateToProps = state => ({
  pages: state.unmanagedPages.pages,
  loading: state.unmanagedPages.loading,
  error: state.unmanagedPages.error
});

export default connect(mapStateToProps)(AddPagesSection);
