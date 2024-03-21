import PropTypes from 'prop-types';
const SingleByte = (props) =>
{
    return (
        <div className="bg-zinc-400 w-[45%] lg:w-[60%] max-h-28 rounded-lg p-2 text-center flex flex-col items-center justify-center text-2xl">
            <h2>{props.id}</h2>
            <p>{parseInt(props.binary,2)}</p>
            <p>{props.binary}</p>
        </div>
    );
}

SingleByte.propTypes = {
    id: PropTypes.string.isRequired,
    binary: PropTypes.string.isRequired,
}

export default SingleByte;