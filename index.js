var _ = require('lodash');

/**
 * Custom reporter that dumps a MUCH lighter JSON report out
 * Built using the original JSON reporter as a template
 *
 * @param {Object} newman - The collection run object, with event hooks for reporting run details.
 * @param {Object} options - A set of collection run options.
 * @param {String} options.export - The path to which the summary object must be written.
 * @returns {*}
 */

function createLightSummary(obj) {
    obj = _.pick(obj, ['collection', 'run']);

    var failures = [];
    obj.run.failures.forEach(function(failureReport) {
        failures.push({
            'parent': {
                'name': failureReport.parent.name,
                'description': {
                    'content': failureReport.parent.description.content
                }
            },
            'source': {
                'name': failureReport.source.name
            },
            'error': {
                'message': failureReport.error.message
            }
        });
    });

    Object.assign(lightSummary, {
        'collection': {
            'description': obj.collection.description,
            'item': obj.collection.items.members,
            'info': {
                'name': obj.collection.name
            }
        },
        'run': {
            'stats': obj.run.stats,
            'failures': failures
        }
    });
    return obj
}

module.exports = function(newman, options) {
    newman.on('beforeDone', function(err, o) {
        loopThrough(o.summary);

        newman.exports.push({
            name: 'json-reporter',
            default: 'newman-run-report.json',
            path: options.export,
            content: JSON.stringify(createLightSummary(o.summary))
        });
    });
};
