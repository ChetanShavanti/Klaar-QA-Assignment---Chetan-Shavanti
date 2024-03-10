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

    var data = {"OkPercent": 97.22222222222223, "KoPercent": 2.7777777777777777};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8954128440366973, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competency_types"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9"], "isController": false}, {"data": [0.95, 500, 1500, "https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_classification_categories"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/stats/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.6, 500, 1500, "https://okr-stage.klaarhq.com/performance/values/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/"], "isController": false}, {"data": [0.9, 500, 1500, "https://um-stage.klaarhq.com/accounts/darwinbox/"], "isController": false}, {"data": [0.975, 500, 1500, "https://review-stage.klaarhq.com/get_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_template_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with="], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/aspiration_settings/"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item"], "isController": false}, {"data": [0.6, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/department/details/"], "isController": false}, {"data": [0.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [0.3, 500, 1500, "https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/jira_config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0"], "isController": false}, {"data": [0.0, 500, 1500, "https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/integrations/info/nylas"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/my-org/"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_ratings_for_org"], "isController": false}, {"data": [0.9, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-config/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/document/settings/"], "isController": false}, {"data": [0.5, 500, 1500, "https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10"], "isController": false}, {"data": [0.2, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea"], "isController": false}, {"data": [0.4, 500, 1500, "https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies?type=undefined"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://pas-stage.klaarhq.com/get_pas_keys"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/values/opertaions/"], "isController": false}, {"data": [0.5, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/eou/"], "isController": false}, {"data": [1.0, 500, 1500, "https://surveyms-stage.klaarhq.com/get_all_system_reports"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D"], "isController": false}, {"data": [1.0, 500, 1500, "https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_org"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/org-chart/"], "isController": false}, {"data": [0.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/razorpay/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/user_customfield/"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/successfactor/"], "isController": false}, {"data": [0.1, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991"], "isController": false}, {"data": [1.0, 500, 1500, "https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5"], "isController": false}, {"data": [1.0, 500, 1500, "https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://review-stage.klaarhq.com/get_reviews_for_user"], "isController": false}, {"data": [0.7, 500, 1500, "https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all"], "isController": false}, {"data": [1.0, 500, 1500, "https://um-stage.klaarhq.com/accounts/me/"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 540, 15, 2.7777777777777777, 293.3259259259253, 33, 9567, 122.0, 512.1000000000004, 1101.7999999999984, 5046.8800000000265, 15.038012754462668, 96.68697588870478, 8.541828389122504], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://survey-stage.klaarhq.com/surveys/?name=&organization=false&page=1", 5, 0, 0.0, 118.8, 111, 132, 116.0, 132.0, 132.0, 132.0, 0.5232314776056927, 4.592582539765592, 0.2815435001569695], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9", 5, 0, 0.0, 114.6, 92, 166, 108.0, 166.0, 166.0, 166.0, 0.5267593763168984, 1.2875768739464812, 0.2788120917614833], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22manager%22%2C%22__isnull%22%2C%22true%22%2C%22%22%5D%5D&page_size=10", 5, 0, 0.0, 152.2, 125, 242, 134.0, 242.0, 242.0, 242.0, 0.5679236710586097, 1.5828653878918673, 0.34885155185143113], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/my-nominations/?offset=0&limit=10", 5, 0, 0.0, 126.6, 109, 143, 127.0, 143.0, 143.0, 143.0, 0.5410084397316598, 0.2699758913114044, 0.29797730469595324], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports", 5, 0, 0.0, 87.4, 76, 125, 78.0, 125.0, 125.0, 125.0, 0.5227938101212882, 0.13274061585110833, 0.32929883547678795], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/settings/", 5, 0, 0.0, 130.2, 113, 167, 122.0, 167.0, 167.0, 167.0, 0.5785697755149272, 0.4537026657602407, 0.30115008823189077], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competency_types", 10, 0, 0.0, 85.0, 49, 145, 66.5, 143.9, 145.0, 145.0, 1.0671219720414042, 0.2917911642300715, 0.609635110980685], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/templates/?limit=9&offset=9", 5, 0, 0.0, 89.6, 84, 97, 88.0, 97.0, 97.0, 97.0, 0.5311238580837051, 0.2748980906097302, 0.2857902791055874], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_reports?is_system_report=true", 10, 0, 0.0, 189.89999999999998, 71, 622, 144.5, 588.8000000000002, 622.0, 622.0, 0.9433072351664937, 0.23951160267899252, 0.6056879952362985], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/department/", 5, 0, 0.0, 118.2, 114, 126, 117.0, 126.0, 126.0, 126.0, 0.5128205128205128, 0.2283653846153846, 0.2844551282051282], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_resource/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 118.2, 109, 129, 115.0, 129.0, 129.0, 129.0, 0.5776340110905731, 0.26850955984288355, 0.32322684409658037], "isController": false}, {"data": ["Test", 5, 5, 100.0, 31679.2, 28636, 35138, 31792.0, 35138.0, 35138.0, 35138.0, 0.1391710969465861, 96.63853417172322, 8.537548796865867], "isController": true}, {"data": ["https://review-stage.klaarhq.com/get_classification_categories", 5, 0, 0.0, 82.0, 48, 179, 51.0, 179.0, 179.0, 179.0, 0.5861664712778428, 0.16600417643610788, 0.3400223475967175], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/stats/", 35, 0, 0.0, 60.74285714285714, 33, 411, 36.0, 109.19999999999999, 182.99999999999878, 411.0, 1.6164041934143074, 0.8034665375467603, 0.8366154516695147], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/code_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 146.4, 120, 200, 127.0, 200.0, 200.0, 200.0, 0.5966587112171838, 0.8349725909904534, 0.33212447792362765], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D&basic=true", 5, 0, 0.0, 151.4, 125, 182, 142.0, 182.0, 182.0, 182.0, 0.5149330587023687, 8.132321704428424, 0.2821068807929969], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/display_settings/?org_id=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 137.4, 114, 160, 138.0, 160.0, 160.0, 160.0, 0.6653359946773121, 0.9375779690618763, 0.42623087159015305], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/values/", 5, 0, 0.0, 807.6, 418, 1155, 846.0, 1155.0, 1155.0, 1155.0, 2.00160128102482, 2.4316328062449957, 1.0301209717774218], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/experience/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 5, 0, 0.0, 119.8, 110, 136, 112.0, 136.0, 136.0, 136.0, 0.5172770535899027, 0.22176233059176495, 0.28894772915373473], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/", 5, 0, 0.0, 211.2, 153, 360, 179.0, 360.0, 360.0, 360.0, 0.684931506849315, 0.2842733304794521, 0.3511611729452055], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/darwinbox/", 5, 0, 0.0, 219.2, 116, 504, 161.0, 504.0, 504.0, 504.0, 0.6127450980392157, 0.25969860600490197, 0.31474992340686275], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reports", 20, 0, 0.0, 154.7, 62, 513, 135.5, 275.0, 501.14999999999986, 513.0, 2.0222446916076846, 0.7919141809908998, 1.2703211893326591], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_template_for_org", 5, 0, 0.0, 269.0, 186, 411, 262.0, 411.0, 411.0, 411.0, 0.5261496369567505, 21.07321783252657, 0.3642969654319688], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/f21dc60a-55d2-43ac-8ad7-2a1aa6362697/?with=", 5, 0, 0.0, 116.4, 110, 125, 115.0, 125.0, 125.0, 125.0, 0.6915629322268326, 1.126491182572614, 0.3876534405255878], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/skills/?user_id=a183e59a-2984-40ee-9cea-6ede421c4380", 5, 0, 0.0, 116.6, 111, 125, 114.0, 125.0, 125.0, 125.0, 0.5165822915590453, 0.22146447851017667, 0.28805516453145985], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/aspiration_settings/", 5, 0, 0.0, 202.6, 127, 279, 208.0, 279.0, 279.0, 279.0, 0.5781015146259683, 9.181877962770264, 0.3026000115620303], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=action_item", 5, 0, 0.0, 92.4, 81, 107, 94.0, 107.0, 107.0, 107.0, 0.5803830528148578, 0.2573182675565873, 0.3162634213580963], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/department/details/", 5, 0, 0.0, 681.8, 475, 976, 582.0, 976.0, 976.0, 976.0, 0.5553704320781961, 17.887375215206042, 0.2923287723536599], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 5, 5, 100.0, 67.8, 55, 90, 58.0, 90.0, 90.0, 90.0, 0.5826826710173639, 0.14111845938701784, 0.3675908256613449], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/my_objectives/?time_period_id=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=5&sort_by_key=created_at&sort_by_value=DESC", 5, 0, 0.0, 1671.6, 1109, 2483, 1333.0, 2483.0, 2483.0, 2483.0, 1.2091898428053203, 18.710559628174124, 0.7640095979443773], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 5, 5, 100.0, 100.0, 93, 120, 96.0, 120.0, 120.0, 120.0, 0.6007449237053947, 0.272212543554007, 0.3121057611438183], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/compensation_mapping/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea&limit=10&offset=0", 5, 0, 0.0, 168.6, 133, 194, 182.0, 194.0, 194.0, 194.0, 0.5924872615238772, 0.822770396373978, 0.34484610143381916], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/dashboard/?weightage_enabled=true", 5, 0, 0.0, 6089.8, 4164, 9567, 5388.0, 9567.0, 9567.0, 9567.0, 0.3290989271374975, 1.425281173895873, 0.17772627608108998], "isController": false}, {"data": ["https://um-stage.klaarhq.com/integrations/info/nylas", 5, 0, 0.0, 141.6, 124, 152, 143.0, 152.0, 152.0, 152.0, 0.513874614594039, 0.22231099049331962, 0.26597025950668035], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org_users/user/?org_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&dr_count=false", 5, 0, 0.0, 135.0, 130, 140, 135.0, 140.0, 140.0, 140.0, 0.5419466724474311, 1.1257036838825059, 0.31490065440060694], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=9", 5, 0, 0.0, 38.6, 36, 44, 37.0, 44.0, 44.0, 44.0, 0.517384105960265, 1.8441913933153975, 0.3410490932843543], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/my-org/", 15, 0, 0.0, 195.53333333333336, 134, 327, 185.0, 306.0, 327.0, 327.0, 1.2068549360366883, 3.869242924812937, 0.6163917300265508], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_ratings_for_org", 15, 0, 0.0, 102.53333333333335, 60, 211, 69.0, 198.4, 211.0, 211.0, 1.0699001426533523, 0.4360400320970043, 0.6686875891583453], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-config/", 5, 0, 0.0, 266.2, 117, 600, 182.0, 600.0, 600.0, 600.0, 0.6255473539346929, 0.41295899537094954, 0.32193696828474916], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/document/settings/", 5, 0, 0.0, 158.8, 107, 294, 118.0, 294.0, 294.0, 294.0, 0.5781683626271971, 0.26875794981498613, 0.3037642373959297], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/feedback-nomination/feedback-nomination/?created_by=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&offset=0&limit=10", 5, 0, 0.0, 574.4, 540, 592, 589.0, 592.0, 592.0, 592.0, 0.5163688939378291, 1.916212692347413, 0.31113242925746154], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=10", 10, 0, 0.0, 1498.6999999999998, 933, 2491, 1545.0, 2440.6000000000004, 2491.0, 2491.0, 1.157675387821255, 9.103127170641352, 0.6240593887473952], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_settings_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 65, 0, 0.0, 59.646153846153844, 45, 170, 50.0, 127.19999999999999, 140.69999999999996, 170.0, 4.477509127230144, 86.2226586717297, 2.4705006414892887], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/org/?org=5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea", 5, 0, 0.0, 258.4, 209, 303, 261.0, 303.0, 303.0, 303.0, 0.5131889561736632, 55.904018429898386, 0.27864556604741864], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/bulk_import/?page=1&page_size=10", 5, 0, 0.0, 2123.8, 400, 6474, 984.0, 6474.0, 6474.0, 6474.0, 0.48623942429252165, 0.20988068900126422, 0.26211343965768746], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/?models=%5B%22orguser%22%5D", 5, 0, 0.0, 152.0, 133, 195, 139.0, 195.0, 195.0, 195.0, 0.5990893841361131, 11.812708745207285, 0.32177652468248263], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies?type=undefined", 5, 0, 0.0, 77.4, 58, 102, 71.0, 102.0, 102.0, 102.0, 0.5944596361907026, 0.15674228688622044, 0.3726983265961241], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea/skills/", 15, 0, 0.0, 176.66666666666669, 107, 555, 126.0, 385.80000000000007, 555.0, 555.0, 0.8240852653554553, 1.4872163773211733, 0.4538907125590594], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/programs/?search=&offset=0&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 5, 0, 0.0, 58.2, 40, 110, 45.0, 110.0, 110.0, 110.0, 0.5235053921055386, 6.176750143963983, 0.3461065922416501], "isController": false}, {"data": ["https://pas-stage.klaarhq.com/get_pas_keys", 5, 0, 0.0, 79.8, 63, 93, 87.0, 93.0, 93.0, 93.0, 0.6011783094865938, 0.16849431135024648, 0.354601268486233], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/values/opertaions/", 15, 0, 0.0, 144.06666666666666, 99, 236, 126.0, 230.6, 236.0, 236.0, 0.4718316504671133, 1.0625427597433235, 0.24605283334906106], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/4d4720e5-9027-4a32-b683-a3ef965009fe/?with=pending_requests%2Cprograms_connected%2Cconnection_availability", 5, 0, 0.0, 618.4, 524, 708, 630.0, 708.0, 708.0, 708.0, 0.4902441415825081, 0.8564909856358467, 0.30496632635552506], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_competencies_for_user?type_id=undefined&for_rate_tab=false&ou_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 5, 0, 0.0, 126.4, 55, 205, 118.0, 205.0, 205.0, 205.0, 0.5619240278714318, 0.14816356203641268, 0.3808352298269274], "isController": false}, {"data": ["https://survey-stage.klaarhq.com/pending_surveys/?user=f21dc60a-55d2-43ac-8ad7-2a1aa6362697", 5, 0, 0.0, 125.0, 114, 143, 124.0, 143.0, 143.0, 143.0, 0.5230672664504655, 0.19972588006067582, 0.2906496822366357], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/eou/", 5, 0, 0.0, 190.0, 144, 245, 202.0, 245.0, 245.0, 245.0, 0.6912760956726116, 1.4163059069542376, 0.3510386423337481], "isController": false}, {"data": ["https://surveyms-stage.klaarhq.com/get_all_system_reports", 5, 0, 0.0, 108.8, 65, 171, 117.0, 171.0, 171.0, 171.0, 0.5215395848544905, 0.222061776363826, 0.3753658926149995], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/?page=1&page_size=10&search=&get_disabled=true&filter=%5B%5D", 5, 0, 0.0, 178.2, 153, 219, 162.0, 219.0, 219.0, 219.0, 0.5788376939106274, 13.803357077737903, 0.3306836434938643], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_for_org/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 10, 0, 0.0, 146.29999999999998, 79, 268, 131.5, 263.5, 268.0, 268.0, 0.781921964187974, 13.674471225271718, 0.5200086500117288], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&filter=%5B%5B%22roles%22%2C%22__iregex%22%2C%22(%3F%3C!_)ADMIN%22%2C%22%22%5D%5D&page_size=10", 10, 0, 0.0, 165.0, 118, 369, 139.5, 350.4000000000001, 369.0, 369.0, 0.7240081088908196, 1.167321667752679, 0.455333224732117], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_org", 10, 0, 0.0, 110.50000000000001, 71, 231, 84.0, 226.40000000000003, 231.0, 231.0, 1.050309841403214, 4.516127179392921, 0.6461867188320554], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/org-chart/", 5, 0, 0.0, 146.8, 104, 300, 106.0, 300.0, 300.0, 300.0, 0.5674724775848371, 0.31366154522755646, 0.29149465157189874], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 5, 5, 100.0, 188.0, 120, 326, 142.0, 326.0, 326.0, 326.0, 0.5973715651135005, 0.28118466248506574, 0.30626960125448033], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/user_customfield/", 10, 0, 0.0, 179.29999999999998, 104, 332, 131.5, 329.5, 332.0, 332.0, 0.9531071292413268, 1.0201224742661075, 0.49609970691955774], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/successfactor/", 5, 0, 0.0, 207.4, 120, 403, 146.0, 403.0, 403.0, 403.0, 0.615839389087326, 0.26101005357802687, 0.31874499630496367], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?page=1&page_size=9007199254740991", 5, 0, 0.0, 2968.2, 1403, 6304, 2189.0, 6304.0, 6304.0, 6304.0, 0.4021879021879022, 3.162516590250965, 0.22230307874839125], "isController": false}, {"data": ["https://mentoring-stage.klaarhq.com/mentoring/mentor/?offset=9&ws_user_id=f21dc60a-55d2-43ac-8ad7-2a1aa6362697&limit=5", 5, 0, 0.0, 37.4, 35, 43, 36.0, 43.0, 43.0, 43.0, 0.5223568742164647, 0.2438345565190138, 0.34432704110948603], "isController": false}, {"data": ["https://idp-stage.klaarhq.com/idp/settings/classification_type/?type=goal", 5, 0, 0.0, 180.4, 157, 213, 180.0, 213.0, 213.0, 213.0, 0.5730659025787965, 0.2540741404011461, 0.30835870343839544], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/employee/suggestions/?page=1&page_size=10", 5, 0, 0.0, 151.0, 115, 228, 134.0, 228.0, 228.0, 228.0, 0.5656108597285069, 1.5598486990950227, 0.3076613758484163], "isController": false}, {"data": ["https://review-stage.klaarhq.com/get_reviews_for_user", 10, 0, 0.0, 122.89999999999999, 75, 288, 85.0, 283.0, 288.0, 288.0, 1.0679196924391288, 0.4098558975865015, 0.6778787110209312], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/time_period/?time_period_ids=829e1085-3ca7-484f-860c-47b5d2ef17a8&page=1&page_size=10", 5, 0, 0.0, 717.6, 337, 1155, 568.0, 1155.0, 1155.0, 1155.0, 2.641310089804543, 3.4202902139461173, 1.560539652667723], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/shortcuts/?mode=all", 5, 0, 0.0, 253.8, 122, 490, 229.0, 490.0, 490.0, 490.0, 0.5681172594023407, 0.26464055931144187, 0.2968190759572776], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/me/", 5, 0, 0.0, 239.2, 150, 414, 212.0, 414.0, 414.0, 414.0, 0.6842753524018065, 1.9418986074996578, 0.34681533974271245], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 5, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["500/Internal Server Error", 5, 33.333333333333336, 0.9259259259259259], "isController": false}, {"data": ["404/Not Found", 5, 33.333333333333336, 0.9259259259259259], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 540, 15, "400/Bad Request", 5, "500/Internal Server Error", 5, "404/Not Found", 5, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://gs-stage.klaarhq.com/get_groups_from_groups_ids/5718fbb5-fbc3-4ae4-ab1b-812cf3c2cdea-groups", 5, 5, "500/Internal Server Error", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://okr-stage.klaarhq.com/performance/jira_config/", 5, 5, "404/Not Found", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://um-stage.klaarhq.com/accounts/razorpay/", 5, 5, "400/Bad Request", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
