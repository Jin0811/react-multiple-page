import PropTypes from "prop-types";

const BigTitle = (props) => {
	return <h1>{props.children}</h1>;
};

BigTitle.propTypes = {
	children: PropTypes.element,
};
