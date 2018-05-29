import { connect } from "react-redux";
import MyPagesSection from "../../components/dashboardPage/MyPagesSection";

const mapStateToProps = state => ({
  pages: state.managedPages.pages,
  loading: state.managedPages.loading,
  error: state.managedPages.error
});

export default connect(mapStateToProps)(MyPagesSection);
