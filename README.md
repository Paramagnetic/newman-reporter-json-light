# newman-reporter-json-light
Newman reporter which mimics the built-in JSON reporter but only includes a few key items in the report.

This was created to get around the issue mentioned here:
https://github.com/postmanlabs/newman/issues/935

The report object contains the following items:  
**collection.description.content**  
**collection.description.type**  
**collection.info.name**  
**collection.item[].name**  
**collection.item[].item[].name**  

**run.stats.***  
**run.failures[].parent.name**  
**run.failures[].parent.description.content**  
**run.failures[].source.name**  
**run.failures[].error.message**  


Schema followed by the reporter:  
```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {},
    "id": "http://example.com/example.json",
    "properties": {
        "collection": {
            "properties": {
                "description": {
                    "properties": {
                        "content": {
                            "type": "string"
                        },
                        "type": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "content",
                        "type"
                    ],
                    "type": "object"
                },
                "info": {
                    "properties": {
                        "name": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "name"
                    ],
                    "type": "object"
                },
                "item": {
                    "items": {
                        "properties": {
                            "item": {
                                "items": {

                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "name"
                                    ],
                                    "type": "object"
                                },
                                "type": "array"
                            },
                            "name": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "item",
                            "name"
                        ],
                        "type": "object"
                    },
                    "type": "array"
                }
            },
            "required": [
                "info",
                "item",
                "description"
            ],
            "type": "object"
        },
        "run": {
            "properties": {
                "failures": {
                    "items": {
                        "properties": {
                            "error": {
                                "properties": {
                                    "message": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "message"
                                ],
                                "type": "object"
                            },
                            "parent": {
                                "properties": {
                                    "description": {

                                        "properties": {
                                            "content": {
                                                "type": "string"
                                            }
                                        },
                                        "required": [
                                            "content"
                                        ],
                                        "type": "object"
                                    },
                                    "name": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "name",
                                    "description"
                                ],
                                "type": "object"
                            },
                            "source": {
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "name"
                                ],
                                "type": "object"
                            }
                        },
                        "required": [
                            "source",
                            "parent",
                            "error"
                        ],
                        "type": "object"
                    },
                    "type": "array"
                },
                "stats": {
                    "properties": {
                        "assertions": {

                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "items": {
                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "iterations": {
                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "prerequestScripts": {
                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "prerequests": {
                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "requests": {
                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "scripts": {
                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "testScripts": {
                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        },
                        "tests": {

                            "properties": {
                                "failed": {
                                    "type": "integer"
                                },
                                "pending": {
                                    "type": "integer"
                                },
                                "total": {
                                    "type": "integer"
                                }
                            },
                            "required": [
                                "failed",
                                "total",
                                "pending"
                            ],
                            "type": "object"
                        }
                    },
                    "required": [
                        "tests",
                        "prerequests",
                        "items",
                        "testScripts",
                        "prerequestScripts",
                        "assertions",
                        "iterations",
                        "scripts",
                        "requests"
                    ],
                    "type": "object"
                }
            },
            "required": [
                "failures",
                "stats"
            ],
            "type": "object"
        }
    },
    "required": [
        "run",
        "collection"
    ],
    "type": "object"
}
```
