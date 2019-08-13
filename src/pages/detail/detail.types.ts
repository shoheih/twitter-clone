import { RouteComponentProps } from 'react-router';

interface PathParamsType {
  id: string;
}

export type DetailTypes = RouteComponentProps<PathParamsType> & {
  someString: string;
};
