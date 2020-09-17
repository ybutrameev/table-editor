
import PropTypes from 'prop-types';

export const MixType = PropTypes.shape({
    block: PropTypes.string,
    elem: PropTypes.string,
    mods: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]))
});

export const HistoryType = PropTypes.shape({
    location: PropTypes.object,
    push: PropTypes.func
});

export const LocationType = PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.object
});

export const MatchType = PropTypes.shape({
    path: PropTypes.string
});

export const ChildrenType = PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]);
