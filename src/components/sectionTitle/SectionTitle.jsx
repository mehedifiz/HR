import PropTypes from "prop-types";

function SectionTitle({ sectionTitle }) {
  return (
    <h2 className="text-2xl text-center md:text-3xl text-primary font-bold mb-6 uppercase">{`${sectionTitle}`}</h2>
  );
}

SectionTitle.propTypes = {
  sectionTitle: PropTypes.string,
};

export default SectionTitle;