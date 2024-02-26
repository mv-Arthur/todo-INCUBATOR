import Checkbox from "@mui/material/Checkbox/Checkbox";
import React, { ChangeEvent } from "react";

type CheckBoxProps = {
	isDone: boolean;

	CB: (actualValue: boolean) => void;
};

export const CheckBox = (props: CheckBoxProps) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.CB(e.currentTarget.checked);
	};

	return <Checkbox onChange={onChangeHandler} checked={props.isDone} color="primary" />;
};
