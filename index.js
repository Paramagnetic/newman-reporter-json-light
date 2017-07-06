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

function createLightSummary(summary) {
    summary = _.pick(summary, ['collection', 'run']);

    var failures = [];
    summary.run.failures.forEach(function(failureReport) {
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

    var collectionFolders = [];
    summary.collection.items.members.forEach(function(collectionFolder){
      var folderItems = [];
      collectionFolder.items.members.forEach(function(folderItem) {
        folderItems.push({'name': folderItem.name});
      });
      collectionFolders.push( {
        'name': collectionFolder.name,
        'item': folderItems
      });
    });

    var lightSummary = {}
    Object.assign(lightSummary, {
        'collection': {
            'description': summary.collection.description,
            'item': collectionFolders,
            'info': {
                'name': summary.collection.name
            }
        },
        'run': {
            'stats': summary.run.stats,
            'failures': failures
        }
    });
    return lightSummary
}

module.exports = function(newman, options) {
    newman.on('beforeDone', function(err, o) {
        newman.exports.push({
            name: 'json-reporter',
            default: 'newman-run-report.json',
            path: options.export,
            content: JSON.stringify(createLightSummary(o.summary))
        });
    });
};
