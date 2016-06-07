// Phenogrid loader
function loadPhenogrid(){

    function initPhenogrid () {
        // Add spinner
        var spinner_div = makeSpinnerDiv();
        jQuery('#compare').append(spinner_div.to_string());

        var disease_id = window.location.pathname;
        var slash_idx = disease_id.indexOf('/');
        disease_id = disease_id.substring(slash_idx+1);
        var phenotype_list = [];
        var phenogridContainer = document.getElementById('phen_vis');
        jQuery.ajax({
            url : '/' + disease_id + '/phenotype_list.json', // Fetching this list takes several seconds which causes empty page conten - Zhou
            async : true,
            dataType : 'json',
            //timeout : 180000,
            error : function(jqXHR, textStatus, errorThrown) {
                jQuery('#' + spinner_div.get_id()).remove();
                var phenogridOpts = {
                                        phenotypeData: phenotype_list,
                                        serverURL: global_app_base
                                    };
                Phenogrid.createPhenogridForElement(phenogridContainer, phenogridOpts);
            },
            success : function(data) {
                jQuery('#' + spinner_div.get_id()).remove();
                // Phenogrid will remove the duplicated phenotypes in this monarch-app returned phenotype_list
                // before sending the ajax POST to simsearch - Zhou
                phenotype_list = data.phenotype_list;

                var phenogridOpts = {
                                        phenotypeData: phenotype_list,
                                        serverURL: global_app_base
                                    };
                Phenogrid.createPhenogridForElement(phenogridContainer, phenogridOpts);
            }
        });
    }

    initPhenogrid();
}
