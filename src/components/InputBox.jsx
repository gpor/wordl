import PropTypes from 'prop-types';


function InputBox({box}) {
  return (
    <div className="input-box">
      <p>{box.val}</p>
    </div>
  )
}

InputBox.propTypes = {
  box: PropTypes.object,
}

export default InputBox