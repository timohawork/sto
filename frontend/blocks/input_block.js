const InputBlock = props => {
	return (
		<div className={'input-block'+(props.error ? ' error' : '')}>
			<div className="label">
				<label htmlFor={props.name}>{props.title}</label>
			</div>
			<div className="input">
				{props.children}
			</div>
			{ props.error ? 
				<p>{props.error}</p>
			: null }
		</div>
	);
};

export default InputBlock;