import PropTypes from 'prop-types';
import {
    Children,
    cloneElement,
    createRef,
    PureComponent
} from 'react';

import { ChildrenType } from 'Type/Common';

export default class ClickOutside extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        children: ChildrenType
    };

    static defaultProps = {
        onClick: () => {},
        children: []
    };

    constructor(props) {
        super(props);

        const { children } = this.props;

        this.childrenRefs = Children.map(
            children,
            () => createRef()
        );
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick = ({ target }) => {
        const { onClick } = this.props;

        if (this.childrenRefs.every(
            ({ current }) => !current.contains(target)
        )) {
            onClick();
        }
    };

    render() {
        const { children } = this.props;

        return Children.map(children, (element, idx) => (
            cloneElement(element, { ref: this.childrenRefs[idx] })
        ));
    }
}
