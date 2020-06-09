import { ActionCreator } from '@ngrx/store';

import { NotAllowedCheck, TypedAction } from '@ngrx/store/src/models';

export type typeAction<
	S extends string,
	O extends object = object
> = ActionCreator<S, (props: O & NotAllowedCheck<O>) => O & TypedAction<S>>;
