/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 90.85185185185185, "KoPercent": 9.148148148148149};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4696330275229358, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.12, 500, 1500, "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1"], "isController": false}, {"data": [0.075, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9"], "isController": false}, {"data": [0.525, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [0.155, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10"], "isController": false}, {"data": [0.825, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [0.905, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/settings/"], "isController": false}, {"data": [0.255, 500, 1500, "https://review-stage.klaarhq.com/get_competency_types"], "isController": false}, {"data": [0.115, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9"], "isController": false}, {"data": [0.6725, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true"], "isController": false}, {"data": [0.89, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/"], "isController": false}, {"data": [0.46, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.245, 500, 1500, "https://review-stage.klaarhq.com/get_classification_categories"], "isController": false}, {"data": [0.175, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/stats/"], "isController": false}, {"data": [0.5, 500, 1500, "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.815, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true"], "isController": false}, {"data": [0.51, 500, 1500, "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/values/"], "isController": false}, {"data": [0.95, 500, 1500, "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [0.48, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/"], "isController": false}, {"data": [0.555, 500, 1500, "https://um-stage.klaarhq.com/accounts/darwinbox/"], "isController": false}, {"data": [0.25, 500, 1500, "https://review-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [0.8, 500, 1500, "https://surveyms-stage.klaarhq.com/get_template_for_org"], "isController": false}, {"data": [0.45, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with="], "isController": false}, {"data": [0.96, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [0.435, 500, 1500, "https://um-stage.klaarhq.com/accounts/aspiration_settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item"], "isController": false}, {"data": [0.225, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/department/details/"], "isController": false}, {"data": [0.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/jira_config/"], "isController": false}, {"data": [0.43, 500, 1500, "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true"], "isController": false}, {"data": [0.82, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/nylas"], "isController": false}, {"data": [0.605, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false"], "isController": false}, {"data": [0.045, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9"], "isController": false}, {"data": [0.49833333333333335, 500, 1500, "https://um-stage.klaarhq.com/accounts/my-org/"], "isController": false}, {"data": [0.43, 500, 1500, "https://review-stage.klaarhq.com/get_ratings_for_org"], "isController": false}, {"data": [0.52, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-config/"], "isController": false}, {"data": [0.445, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/document/settings/"], "isController": false}, {"data": [0.09, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10"], "isController": false}, {"data": [0.9996153846153846, 500, 1500, "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.12, 500, 1500, "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10"], "isController": false}, {"data": [0.555, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D"], "isController": false}, {"data": [0.235, 500, 1500, "https://review-stage.klaarhq.com/get_competencies?type=undefined"], "isController": false}, {"data": [0.5516666666666666, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/"], "isController": false}, {"data": [0.02, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_pas_keys"], "isController": false}, {"data": [0.7633333333333333, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/opertaions/"], "isController": false}, {"data": [0.005, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability"], "isController": false}, {"data": [0.295, 500, 1500, "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [0.13, 500, 1500, "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [0.45, 500, 1500, "https://um-stage.klaarhq.com/accounts/eou/"], "isController": false}, {"data": [0.58, 500, 1500, "https://surveyms-stage.klaarhq.com/get_all_system_reports"], "isController": false}, {"data": [0.395, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D"], "isController": false}, {"data": [0.9975, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [0.4575, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [0.325, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_org"], "isController": false}, {"data": [0.525, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-chart/"], "isController": false}, {"data": [0.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/razorpay/"], "isController": false}, {"data": [0.4625, 500, 1500, "https://um-stage.klaarhq.com/accounts/user_customfield/"], "isController": false}, {"data": [0.555, 500, 1500, "https://um-stage.klaarhq.com/accounts/successfactor/"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991"], "isController": false}, {"data": [0.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal"], "isController": false}, {"data": [0.48, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10"], "isController": false}, {"data": [0.28, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_user"], "isController": false}, {"data": [0.1, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10"], "isController": false}, {"data": [0.465, 500, 1500, "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all"], "isController": false}, {"data": [0.48, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 10800, 988, 9.148148148148149, 3016.8612962962843, 26, 60195, 582.0, 5547.9, 13328.249999999962, 46333.63999999997, 23.789227444838726, 141.51284979663515, 13.51265633707573], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", 100, 15, 15.0, 5155.769999999998, 27, 25022, 4696.0, 9437.400000000001, 13562.749999999996, 25002.889999999992, 0.6733145254142567, 5.0771794665160686, 0.36230107763989794], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", 100, 0, 0.0, 3673.9799999999987, 498, 25701, 2568.0, 7195.000000000001, 16242.799999999965, 25699.98, 1.2285163208393224, 3.0029065928328356, 0.6502498495067507], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", 100, 0, 0.0, 1292.0499999999997, 114, 3990, 685.5, 3396.6000000000004, 3873.0499999999984, 3989.62, 0.4507042253521127, 1.256161971830986, 0.27684859154929575], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", 100, 2, 2.0, 19596.310000000005, 28, 52022, 17199.5, 48393.0, 50752.7, 52019.28, 0.7523265699174697, 0.3759281829056357, 0.4143673685873564], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports", 100, 0, 0.0, 717.7900000000001, 70, 5626, 193.0, 2706.0, 4212.449999999999, 5617.879999999996, 0.654326076857141, 0.16613748045200843, 0.4121487495828671], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/settings/", 100, 0, 0.0, 1709.090000000001, 106, 27283, 247.5, 498.5000000000007, 20038.499999999978, 27250.209999999985, 0.4163318664573905, 0.3264789929348482, 0.21670398908377844], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competency_types", 200, 3, 1.5, 2784.045, 47, 9478, 3192.0, 4986.300000000001, 6558.95, 8752.890000000001, 0.9431693319060037, 0.2615590928007885, 0.5388223234033322], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", 100, 0, 0.0, 3254.8599999999988, 104, 25497, 2634.0, 6050.300000000008, 9103.949999999999, 25455.98999999998, 1.2608750472828143, 0.6526013428319254, 0.6784591318875299], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", 200, 0, 0.0, 913.55, 68, 5584, 311.5, 2650.600000000001, 3875.85, 4595.410000000003, 1.2980606973182067, 0.3295857239284509, 0.8334715903190634], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", 100, 0, 0.0, 352.9199999999998, 103, 2100, 158.5, 916.7000000000003, 1793.9, 2098.669999999999, 1.2173150898378535, 0.5420856259434192, 0.6752294638944345], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 100, 0, 0.0, 1549.35, 102, 5008, 1062.5, 3354.3, 4786.799999999999, 5007.68, 0.4203022814007834, 0.19537488861989544, 0.23518867894789933], "isController": false}, {"data": ["Test", 100, 100, 100.0, 325821.01999999996, 138246, 453557, 359694.5, 451086.3, 452366.0, 453552.7, 0.2202420019117006, 141.49446122336724, 13.510900464930867], "isController": true}, {"data": ["https://review-stage.klaarhq.com/get_classification_categories", 100, 1, 1.0, 2412.3399999999992, 47, 5090, 3005.0, 4150.8, 4673.2999999999965, 5088.059999999999, 0.5070685353832424, 0.14486611330699958, 0.29413936525160744], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/stats/", 700, 0, 0.0, 4721.032857142858, 30, 27815, 3025.0, 10807.699999999997, 17079.949999999968, 25914.84, 1.7869131585732263, 0.8882214821423556, 0.9248671621521581], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 100, 0, 0.0, 1454.82, 106, 5459, 1305.5, 3390.7, 4684.5499999999965, 5455.469999999998, 0.41953347877160596, 0.5871010498825306, 0.23352937783185096], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", 100, 0, 0.0, 561.93, 123, 3475, 296.5, 1477.0, 1666.6999999999994, 3472.8999999999987, 1.1186683372113835, 17.667094091193842, 0.6128641964605334], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 100, 0, 0.0, 1452.6800000000003, 99, 5334, 704.5, 4119.200000000002, 4752.199999999999, 5332.699999999999, 0.3432026989460245, 0.48363427204991544, 0.21986422901229696], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/values/", 100, 91, 91.0, 22093.860000000004, 139, 60039, 28120.0, 60033.0, 60034.0, 60038.97, 1.4279798369247028, 0.8477375221336875, 0.734907591854803], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 100, 0, 0.0, 245.73999999999998, 98, 2370, 139.0, 341.3000000000003, 867.0999999999982, 2366.7999999999984, 1.108180589108801, 0.47508913927613644, 0.6190227509474944], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/", 100, 0, 0.0, 1367.8700000000001, 153, 4951, 868.0, 3477.0, 3840.399999999998, 4947.089999999998, 0.3388647353635849, 0.1406421020796129, 0.17373436139246295], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/darwinbox/", 100, 0, 0.0, 1166.8499999999997, 106, 5137, 641.0, 3095.5000000000014, 4565.1499999999905, 5136.009999999999, 0.35659522875583927, 0.15113508718753343, 0.18317293977106586], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reports", 400, 7, 1.75, 2822.9925000000007, 62, 9478, 3404.0, 5006.8, 5317.65, 7871.410000000011, 1.8861874493087123, 0.747498480734953, 1.184853590593583], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_template_for_org", 100, 0, 0.0, 575.2399999999999, 178, 2602, 367.0, 1421.9000000000015, 2406.5499999999993, 2600.8899999999994, 1.3175577749084297, 52.77050490460882, 0.9122543578223405], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", 100, 0, 0.0, 7222.760000000001, 104, 26235, 1710.5, 25776.0, 25943.75, 26234.9, 0.3215103269117004, 0.523710180946012, 0.18022160903058207], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 100, 0, 0.0, 213.72999999999993, 107, 1966, 129.0, 337.70000000000016, 765.7999999999977, 1958.169999999996, 1.1198584498919337, 0.48009556592046765, 0.6244523192268497], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/aspiration_settings/", 100, 0, 0.0, 1719.2999999999997, 124, 5147, 1129.0, 4201.2, 4969.899999999999, 5146.4, 0.44402410162823636, 7.052351551642223, 0.23241886569602999], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", 100, 0, 0.0, 125.51999999999998, 77, 439, 109.0, 191.70000000000002, 224.0999999999998, 437.5999999999993, 0.4305593827500689, 0.19089253883645632, 0.2346212261470102], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/department/details/", 100, 0, 0.0, 2522.75, 430, 5857, 1840.5, 4996.5, 5535.549999999997, 5855.74, 0.43330560177481975, 13.95591020716341, 0.22807785093420688], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 100, 100, 100.0, 67.53999999999999, 52, 126, 65.0, 74.0, 88.74999999999994, 125.93999999999997, 0.4305575289442299, 0.10427565154118067, 0.2716212536113013], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", 100, 100, 100.0, 353.41999999999996, 26, 30032, 30.0, 147.0, 181.89999999999998, 29733.589999999847, 3.2333160889808585, 1.7208567075142265, 2.042925302315054], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 100, 100, 100.0, 17291.079999999998, 148, 60195, 270.5, 57158.40000000017, 60151.0, 60194.95, 0.3681370058681039, 0.1822457933444511, 0.19125867882991335], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", 100, 0, 0.0, 1541.3499999999995, 110, 5404, 1311.5, 3728.0, 4814.899999999994, 5401.729999999999, 0.4217362882989267, 0.585653322227611, 0.24546369904898466], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", 100, 100, 100.0, 29.740000000000002, 27, 40, 29.0, 32.900000000000006, 35.89999999999998, 40.0, 3.221857078420001, 1.7147579177137702, 1.7399286761389265], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/nylas", 100, 0, 0.0, 485.08000000000004, 113, 2155, 283.5, 1277.6000000000004, 1587.4999999999995, 2152.4999999999986, 1.4304923754756387, 0.6188555882184648, 0.740391561525477], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", 100, 0, 0.0, 964.1900000000003, 133, 4083, 775.0, 1679.0, 2688.1499999999965, 4081.379999999999, 1.304478273914348, 2.7095950084138845, 0.7579732157998408], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", 100, 0, 0.0, 8321.540000000003, 42, 28027, 6146.0, 20847.900000000005, 24789.5, 28026.99, 1.2134302459623107, 4.325215232189877, 0.7998685703364842], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/my-org/", 300, 0, 0.0, 1376.3066666666673, 117, 5646, 868.5, 3168.0000000000005, 3966.4999999999986, 5085.410000000001, 1.125479735737358, 3.608349582447018, 0.5748299822174202], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_ratings_for_org", 300, 1, 0.3333333333333333, 2085.0433333333335, 64, 7424, 1361.5, 4998.000000000001, 5496.85, 6082.31, 1.164035945429995, 0.47544729900009314, 0.7275224658937468], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-config/", 100, 0, 0.0, 1400.07, 113, 5269, 702.5, 3785.2000000000007, 4601.15, 5268.33, 0.34675386370492634, 0.22891173033645526, 0.1784563341528283], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/document/settings/", 100, 0, 0.0, 1415.53, 99, 3601, 913.0, 2881.1, 3078.3499999999995, 3599.479999999999, 0.4160772239327619, 0.19341089706249479, 0.21860307273029875], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", 100, 0, 0.0, 18892.909999999996, 515, 52583, 15490.0, 48439.100000000006, 50869.45, 52579.17, 0.7794353770128919, 2.8924359693837784, 0.4696402613446819], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", 200, 138, 69.0, 18333.66, 26, 60037, 2477.5, 60033.0, 60034.0, 60036.98, 2.6245341451892292, 7.361433824011863, 1.4147879376410688], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 1300, 0, 0.0, 67.08846153846159, 42, 963, 52.0, 125.0, 143.9000000000001, 227.96000000000004, 3.5837057171132973, 69.01083304273156, 1.9773376271181768], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 100, 13, 13.0, 6219.620000000002, 28, 49260, 5834.0, 9567.0, 13660.649999999998, 49015.89999999988, 0.6537614163087323, 62.00421390092899, 0.354972019011382], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", 100, 100, 100.0, 29.690000000000005, 26, 51, 29.0, 32.900000000000006, 35.849999999999966, 50.87999999999994, 3.2213381438649615, 1.714481726959379, 1.7365025931772058], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", 100, 0, 0.0, 1264.3600000000001, 125, 4601, 1271.5, 2904.3, 3199.7499999999986, 4593.209999999996, 0.4156016873428506, 8.19473991126904, 0.2232235625376639], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies?type=undefined", 100, 0, 0.0, 2731.150000000001, 54, 6661, 3192.5, 4512.3, 5670.049999999995, 6655.209999999997, 0.4906699116303489, 0.1293758556056584, 0.3076270344401211], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", 300, 0, 0.0, 1290.0566666666668, 95, 5836, 689.0, 3322.1000000000004, 4175.299999999999, 5338.460000000001, 1.0316191262186, 1.8617501418476299, 0.5681964718625884], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 100, 0, 0.0, 4017.430000000001, 512, 22098, 2297.5, 7096.800000000001, 17633.149999999983, 22095.01, 1.0997712475805033, 12.976011927019181, 0.727094858019532], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_pas_keys", 100, 0, 0.0, 66.42999999999999, 55, 151, 62.0, 82.70000000000002, 95.89999999999998, 150.92999999999995, 0.4132197254568144, 0.11581451289658763, 0.24373507243741788], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/opertaions/", 300, 0, 0.0, 663.1099999999999, 91, 4025, 196.0, 1848.9, 2832.3999999999996, 3620.4200000000023, 0.8871015435566858, 1.9977110932048021, 0.46260959400319357], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", 100, 0, 0.0, 15748.259999999997, 1164, 30931, 15728.0, 28290.6, 28963.55, 30927.03, 1.1092131242096857, 1.937873319542117, 0.6900085548062205], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 100, 0, 0.0, 3547.6699999999996, 52, 12039, 3804.5, 7765.600000000002, 10195.199999999975, 12034.969999999998, 0.4721903493736395, 0.12450331477625261, 0.3200196313137752], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 100, 14, 14.0, 8336.740000000005, 28, 52328, 5088.5, 21149.1, 45811.19999999999, 52325.79, 0.7185405005353127, 0.289493231348485, 0.3992671335982353], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/eou/", 100, 0, 0.0, 1986.7199999999996, 125, 6013, 1153.5, 5521.3, 5711.25, 6012.009999999999, 0.31651779779577005, 0.6484905661870367, 0.1607316941931645], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_all_system_reports", 100, 0, 0.0, 1048.7900000000006, 69, 4809, 742.0, 2276.400000000001, 2808.0, 4805.8899999999985, 0.7462185375609101, 0.31772586169585626, 0.537073302912491], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", 100, 0, 0.0, 1634.6799999999996, 129, 5267, 1544.0, 3688.5, 4160.199999999999, 5263.949999999999, 0.42735042735042733, 10.19088875534188, 0.244140625], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 200, 0, 0.0, 163.24499999999998, 74, 607, 153.0, 256.0, 264.95, 312.96000000000004, 0.6271479818377944, 10.96774029174924, 0.41707790589017385], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", 200, 0, 0.0, 1762.8399999999997, 104, 5921, 1046.5, 4501.6, 5359.649999999995, 5840.88, 0.5445362593081667, 0.8779583633962725, 0.34246225683052667], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_org", 200, 2, 1.0, 2619.894999999999, 64, 6408, 3043.5, 5392.6, 6033.099999999999, 6406.9000000000015, 1.1583257559523465, 4.98368525321001, 0.7126418225097444], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-chart/", 100, 0, 0.0, 1128.5499999999995, 100, 3860, 802.0, 2919.4000000000024, 3380.9499999999975, 3858.859999999999, 0.4639574643796657, 0.2564452391004793, 0.23832190064814857], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 100, 100, 100.0, 1010.5599999999998, 104, 4060, 629.0, 2381.6000000000004, 3022.699999999999, 4054.169999999997, 0.36304624846159156, 0.17088700367039758, 0.18613210980696832], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/user_customfield/", 200, 0, 0.0, 1417.0399999999995, 100, 5313, 1054.5, 3115.8, 4422.899999999994, 5075.060000000001, 0.6765396350745209, 0.7241088281656981, 0.3521441655221871], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/successfactor/", 100, 0, 0.0, 1349.1100000000001, 113, 5383, 648.0, 4536.200000000004, 5024.199999999999, 5382.37, 0.3509683215992925, 0.14875024567782513, 0.1816535258277588], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", 100, 100, 100.0, 29.410000000000004, 26, 43, 29.0, 32.0, 33.94999999999999, 42.929999999999964, 3.221857078420001, 1.7147579177137702, 1.7808311585798053], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", 100, 0, 0.0, 13667.060000000001, 1539, 28125, 13935.0, 25906.800000000003, 26628.399999999994, 28123.8, 1.0862362998446682, 0.507051710279054, 0.7160249046827646], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", 100, 0, 0.0, 187.11000000000007, 139, 368, 168.0, 257.6, 275.5499999999999, 367.3399999999997, 0.4303537077123688, 0.19080135088028852, 0.23156727827101095], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", 100, 0, 0.0, 1226.9099999999999, 121, 3769, 789.5, 3217.000000000002, 3625.549999999999, 3767.9799999999996, 0.45737494225641356, 1.2613543329415153, 0.2487869558953343], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_user", 200, 1, 0.5, 2785.449999999999, 65, 6301, 3311.0, 5207.8, 5505.15, 6291.830000000002, 1.101461088133409, 0.4228846870060635, 0.6991696360221834], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", 100, 0, 0.0, 3158.3499999999995, 379, 7850, 3041.0, 5580.400000000001, 6720.199999999999, 7839.989999999995, 11.39211665527455, 14.751901059466848, 6.730693922305764], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", 100, 0, 0.0, 1351.0899999999995, 112, 3744, 852.5, 3027.5, 3120.65, 3741.2499999999986, 0.4391820673178273, 0.20457992784238635, 0.22945547462406016], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/", 100, 0, 0.0, 1867.0200000000002, 140, 5708, 1018.0, 4889.200000000001, 5107.649999999999, 5706.389999999999, 0.3270228817910389, 0.9280551703952726, 0.1657469488765129], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 100, 10.121457489878543, 0.9259259259259259], "isController": false}, {"data": ["502/Bad Gateway", 741, 75.0, 6.861111111111111], "isController": false}, {"data": ["500/Internal Server Error", 100, 10.121457489878543, 0.9259259259259259], "isController": false}, {"data": ["404/Not Found", 47, 4.757085020242915, 0.4351851851851852], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 10800, 988, "502/Bad Gateway", 741, "400/Bad Request", 100, "500/Internal Server Error", 100, "404/Not Found", 47, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", 100, 15, "502/Bad Gateway", 15, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", 100, 2, "502/Bad Gateway", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competency_types", 200, 3, "502/Bad Gateway", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_classification_categories", 100, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/values/", 100, 91, "502/Bad Gateway", 91, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reports", 400, 7, "502/Bad Gateway", 7, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 100, 100, "500/Internal Server Error", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", 100, 100, "502/Bad Gateway", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 100, 100, "502/Bad Gateway", 53, "404/Not Found", 47, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", 100, 100, "502/Bad Gateway", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_ratings_for_org", 300, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", 200, 138, "502/Bad Gateway", 138, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 100, 13, "502/Bad Gateway", 13, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", 100, 100, "502/Bad Gateway", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 100, 14, "502/Bad Gateway", 14, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_org", 200, 2, "502/Bad Gateway", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 100, 100, "400/Bad Request", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", 100, 100, "502/Bad Gateway", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_user", 200, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
