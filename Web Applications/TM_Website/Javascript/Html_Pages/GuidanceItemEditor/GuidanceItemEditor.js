﻿            var showLinksToOtherEditors = false;

            //$(function() { TM.Debug.FireBugLite.open() });
                        
            TM.Gui.GuidanceItemEditor_Page = "";

            function openNotepadEditor()
            {
                window.location = "/notepad/" + loadedGuidanceItem.Metadata.Id;
            }
            

            function showEditor_Elrte()
            {
                TM.Gui.GuidanceItemEditor_Page = "/html_pages/GuidanceItemEditor/Elrte/GuidanceItemEditor_Elrte.html".add_TimeToUrl();
                loadEditor();			
            }
            
            function showEditor_CLEditor()
            {
                TM.Gui.GuidanceItemEditor_Page = "/html_pages/GuidanceItemEditor/cleditor/GuidanceItemEditor_cleditor.html".add_TimeToUrl();
                loadEditor();			
            }
            
            function showEditor_RawHtml()
            {
                TM.Gui.GuidanceItemEditor_Page = "/html_pages/GuidanceItemEditor/RawHtml/GuidanceItemEditor_RawHtml.html".add_TimeToUrl();
                loadEditor();			
            }
            
            function loadGuidanceItemEditor()
                {									
/*					$.ajaxSetup({ async:false});					
                    $("#ScriptLoader").load("/html_pages/GuidanceItemEditor/Scripts_used_in_GuidanceItemEditor.html?time="+new Date().getTime());
                    $.ajaxSetup({ async:true});					
*/					
                    //TM.Gui.Main.homePage();
                    //TM.Gui.Main.homePage();
                    if ($.browser.msie)
                        TM.Gui.GuidanceItemEditor_Page = "/html_pages/GuidanceItemEditor/RawHtml/GuidanceItemEditor_RawHtml.html";								
                    else
                        TM.Gui.GuidanceItemEditor_Page = "/html_pages/GuidanceItemEditor/Elrte/GuidanceItemEditor_Elrte.html";
                    
                    TM.Gui.GuidanceItemEditor_Page = "/html_pages/GuidanceItemEditor/cleditor/GuidanceItemEditor_cleditor.html".add_TimeToUrl();					
                }	

            function createComboBoxForAutoComplete()
                {
                    //based on  jQuery UI Autocomplete comboxbox example					
        
                    $.widget( "ui.combobox", 
                                {
                                    _create: function() 
                                                {
                                                    var self = this,
                                                        select = this.element.hide(),
                                                        selected = select.children( ":selected" ),
                                                        value = selected.val() ? selected.text() : "";
                                                    var input = this.input = $( "<input>" )
                                                        .attr('id', this.element.attr('id') + '_input')
                                                        .insertAfter( select )
                                                        .val( value )
                                                        .autocomplete(
                                                            {
                                                                delay: 0,
                                                                minLength: 0,
                                                                source: function( request, response ) 
                                                                            {
                                                                                var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                                                                                response( select.children( "option" )
                                                                                                .map(function() 
                                                                                                        {
                                                                                                            var text = $( this ).text();
                                                                                                            if ( this.value && ( !request.term || matcher.test(text) ) )
                                                                                                                return {
                                                                                                                            label: text.replace(new RegExp(
                                                                                                                                                                "(?![^&;]+;)(?!<[^<>]*)(" +
                                                                                                                                                                $.ui.autocomplete.escapeRegex(request.term) +
                                                                                                                                                                ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                                                                                                                                            ), 
                                                                                                                                                 "<strong>$1</strong>" ),
                                                                                                                            value: text,
                                                                                                                            option: this
                                                                                                                        };																											
                                                                                                        } ) );
                                                                            },
                                                                select: function( event, ui ) 
                                                                            {
                                                                                ui.item.option.selected = true;
                                                                                self._trigger( "selected", event, 
                                                                                    {
                                                                                        item: ui.item.option
                                                                                    });
                                                                            },
                                                                change: function( event, ui ) 
                                                                            {
                                                                                if ( !ui.item ) 
                                                                                {
                                                                                    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" )
                                                                                    valid = false;
                                                                                    
                                                                                    select.children( "option" ).each(function() 
                                                                                        {
                                                                                            if ( $( this ).text().match( matcher ) ) {
                                                                                                this.selected = valid = true;
                                                                                                return false;
                                                                                            }
                                                                                        });
                                                                                    if ( !valid ) 
                                                                                    {
                                                                                        // remove invalid value, as it didn't match anything
                                                                                        //$( this ).val( "" );
                                                                                        //select.val( "" );
                                                                                        //input.data( "autocomplete" ).term = "";
                                                                                        return false;
                                                                                    }
                                                                                }
                                                                            }
                                                            })
                                                        .addClass( "ui-widget ui-widget-content ui-corner-left" );

                                                        input.data( "autocomplete" )._renderItem = function( ul, item ) 
                                                            {
                                                                return $( "<li></li>" ) .data( "item.autocomplete", item )
                                                                                        .append( "<a>" + item.label + "</a>" )
                                                                                        .appendTo( ul );
                                                            };

                                                        this.button = $( "<button type='button'>&nbsp;</button>" )
                                                            .attr( "tabIndex", -1 )
                                                            .attr( "title", "Show All Items" )
                                                            .insertAfter( input )
                                                            .button({	icons:  {
                                                                                    primary: "ui-icon-triangle-1-s"
                                                                                },
                                                                        text: false
                                                                    })
                                                            .removeClass( "ui-corner-all" )
                                                            .addClass( "ui-corner-right ui-button-icon" )
                                                            .click(function() 
                                                                        {																								
                                                                            // close if already visible
                                                                            if ( input.autocomplete( "widget" ).is( ":visible" ) ) 
                                                                            {
                                                                                input.autocomplete( "close" );
                                                                                return;
                                                                            }

                                                                            // work around a bug (likely same cause as #5265)
                                                                            $( this ).blur();

                                                                            // pass empty string as value to search for, displaying all results
                                                                            input.autocomplete( "search", "" );
                                                                            input.focus();
                                                                        });
                                                },

                                    destroy	: function() 
                                                {
                                                    this.input.remove();
                                                    this.button.remove();
                                                    this.element.show();
                                                    $.Widget.prototype.destroy.call( this );
                                                }
                                });
                    
                    $( ".ItemDetailTable .combobox" ).combobox();					
                    
                    $(".ItemDetailHeader button").height(21).width(15).top(6)
                    
                    if ($.browser.mozilla)
                        $(".ItemDetailHeader button").top(8)
                    else 
                    {
                        if ($.browser.msie)
                        { 
                            if($.browser.version == '7.0')
                                $(".ItemDetailHeader button").top(0)
                        }
                    }
                                
                    $(".ui-autocomplete").css('font-size','11px')
                    $("input").css('font-size', '12px')
                              .css('padding','2px')
                              .css('font-family','Segoe UI, Arial, Helvetica, sans-serif');
                    
                    $("#Title").addClass('ui-widget-content ui-corner-left ui-corner-rigth')
                                        
                
                    TM.Gui.GuidanceItemEditor.checkIfComboxShouldBeVisible();					
                }	
        
        TM.Gui.GuidanceItemEditor.checkIfComboxShouldBeVisible = function()
        {
            //hide the buttons in the cases where there is no auto complete
            $.each($(".ItemDetailTable select"), 
                function()
                    {						
                        var options = $(this).find("option")
                        if (options.length === 0)	
                            $(this).parent().find("button").hide()
                    });

        }
        
        var guidanceId = ""
        
        function showMessage(message)
        {			
            //if (parent===this)
                TM.Gui.Dialog.alertUser(message);
            //else
            //	parent.TM.Gui.Dialog.alertUser(message);
            
            /*"savedMessage".$().html("<div class='ui-widget'><div class='ui-state-highlight ui-corner-all' style='top:0;left: 400px;position:absolute;margin-left: 20px; margin-right: 20px; padding: 5px'>" + message + "</div></div>")
                        .fadeIn(2000)
                        .delay(2000)
                        .fadeOut(1000);*/
        }

        var handleCommand = function(command)
                    {                        
                            var splitCommand = command.split(":");
                            if(splitCommand.length ==2 && splitCommand[0] == 'id')
                                {
                                    guidanceId = splitCommand[1];                                    
                                    loadGuidanceItem();
                                     return false;
                                }                            
                            return true;   // to continue links
                    }
            
            /*var setGuidanceIdfromUrlHash =  function()
                        {
                            handleCommand(window.location.hash.slice(1).split("&")[0]);
                        }*/

            var setGuidanceIdfromUrlHash =  function()
                    {						
                        if (window.location.hash == "" || handleCommand(window.location.hash.slice(1).split("&")[0]))						
                            getGuidFromUrl();					
                    }
                        
            var getGuidFromUrl = function()
                {
                    var mappingText = document.URL.split('/').pop()     //get last segment
                                                  .split("#").shift();  // remove hash				     
                    //var mapping =    { mapping : id }    ;                    
                    //TM.WebServices.Helper.invoke_TM_WebService("getGuidForMapping",mapping, function(data)
                    TM.WebServices.WS_Libraries.getGuidForMapping(mappingText, function(guid)							
                        {						
                            guidanceId = guid;
                            loadGuidanceItem();
                        });						
                }
            
                    
            var loadGuidanceItem = function()				
                        {                                      
                            getGuidanceItemData(guidanceId, showGuidanceItemData);
                        }
                
            var showGuidanceItemData = function(data)
            {		                
                loadedGuidanceItem = data.d;
                if(isUndefined(loadedGuidanceItem) || loadedGuidanceItem === null)
                {
                    TM.Gui.Dialog.alertUser("Error loading article.");
                    return;
                }
                
                $("#Title")                 .val(htmlUnEscape(loadedGuidanceItem.Metadata.Title));
                $("#TechnologyValue_input") .val(loadedGuidanceItem.Metadata.Technology);
                $("#PhaseValue_input")      .val(loadedGuidanceItem.Metadata.Phase);
                $("#TypeValue_input")       .val(loadedGuidanceItem.Metadata.Type);
                $("#CategoryValue_input")   .val(loadedGuidanceItem.Metadata.Category);


                TM.Gui.GuidanceItemEditor.showGuidanceItemHtml(loadedGuidanceItem.Content.Data_Json, loadedGuidanceItem.Content.DataType);
                
            }						  		

                
        TM.Gui.GuidanceItemEditor.showGuidanceItemHtml = function(htmlCode)
            {				
                 //$('#guidanceItem').elrte('val', htmlCode);
                 //TM.Gui.Dialog.alertUser('not implemented: showGuidanceItemHtml');
            }
                  
        TM.Gui.GuidanceItemEditor.getEditorCode = function()
            {				
                //TM.Gui.Dialog.alertUser('not implemented: getEditorCode');
                return null;
            }

        var onSave = function(data)
            {
                if(data.d == true)
                                {
                                    showMessage("Article saved.");
                                    updateCacheWithSavedGuidanceItem();
                                    setTimeout(openGuidanceItemViewer, 1000);
                                }

                            else
                                    TM.Gui.Dialog.alertUser('Error saving article.');
            }

        var updateCacheWithSavedGuidanceItem = function()
            {						
                try
                {
                    if (window.opener == window)   
                        return;
                    var opener = window.opener;
                    if (opener == null)					
                        opener = window.parent;
                    if (opener == null)					
                        return;
                
                    newData = savedGuidanceItem.guidanceItem;
                
                    // update data
                    objectToUpdate = opener.$.data[newData.Metadata.Id];
                    if (isDefined(objectToUpdate))
                    {
                        objectToUpdate.category     = htmlEscape(newData.Metadata.Category);
                        objectToUpdate.phase        = htmlEscape(newData.Metadata.Phase);
                        objectToUpdate.technology   = htmlEscape(newData.Metadata.Technology);
                        objectToUpdate.title        = htmlEscape(newData.Metadata.Title);
                        objectToUpdate.type         = htmlEscape(newData.Metadata.Type);
                    }	
                    //update table cells
                    if (opener.TM.Gui.DataTableViewer.selectedRowTarget != null)
                    {                        
                        var cells = $(opener.TM.Gui.DataTableViewer.selectedRowTarget).parent().find("td");
                        var size = cells.length;
                        cells.eq(size-5).html(objectToUpdate.title);
                        cells.eq(size-4).html(objectToUpdate.technology);
                        cells.eq(size-3).html(objectToUpdate.phase);
                        cells.eq(size-2).html(objectToUpdate.type);
                        cells.eq(size-1).html(objectToUpdate.category);
                        opener.cells = cells;
                    }
                    //update table data and preview pane
                    if(opener.TM.Gui.DataTableViewer.selectedRowIndex > -1)
                    {                        
                        var rowData = opener.TM.Gui.DataTable.currentDataTable.fnGetData(opener.TM.Gui.DataTableViewer.selectedRowIndex)
                        var size = rowData.length;
                        rowData[size-6] = (objectToUpdate.title);
                        rowData[size-5] = (objectToUpdate.technology);
                        rowData[size-4] = (objectToUpdate.phase);
                        rowData[size-3] = (objectToUpdate.type);
                        rowData[size-2] = (objectToUpdate.category);
                        
                        //opener.$("#selectedGuidanceItem #article_title").html(objectToUpdate.title);
                        opener.TM.Gui.selectedGuidanceTitle = objectToUpdate.title;
                        opener.TM.Gui.GuidanceItemViewer.showSelectedGuidanceId();
                        opener.rowData = rowData;
                    }
                    
                    
                    
                }
                catch (error)
                {
                    TM.Gui.Dialog.alertUser(error);
                }
                //opener.TM.Events.onRefreshGuiData();
            }

        var previewEditorCode = function ()
            {
                window.open("/Html_Pages/GuidanceItemViewer/GuidanceItemViewer.html?#preview:" + createUUID(), "Preview");
            };
        
        var saveEditorCode = function()
            {
                var editedLibraryItem = GetEditedLibraryItemCode();

                updateGuidanceItem(editedLibraryItem, onSave);
            };
        
        function GetEditedLibraryItemCode()
            {
                var htmlCode = TM.Gui.GuidanceItemEditor.getEditorCode();

                if (htmlCode === null)
                    {
                        return null;
                    }

                loadedGuidanceItem.Metadata.Title = "#Title".$().val();
                loadedGuidanceItem.Metadata.Technology = "TechnologyValue_input".$().val(),
                loadedGuidanceItem.Metadata.Phase = "PhaseValue_input".$().val(),
                loadedGuidanceItem.Metadata.Type = "TypeValue_input".$().val(),
                loadedGuidanceItem.Metadata.Category = "CategoryValue_input".$().val(),
                loadedGuidanceItem.Metadata.DirectLink = loadedGuidanceItem.Metadata.Title;

                loadedGuidanceItem.Content.Data_Json = htmlCode;

                var savedGuidanceItem = { guidanceItem: loadedGuidanceItem };

                return savedGuidanceItem;
            }

            var openGuidanceItemViewer = function () {
                
                //document.location = "/html_pages/GuidanceItemViewer/GuidanceItemViewer.html?#ruledisplay:" + guidanceId;
                document.location = "/article/" + guidanceId;
            }
        
        var loadEditor = function()
        {									
            $("#guidanceItemEditor").load(TM.Gui.GuidanceItemEditor_Page, setGuidanceIdfromUrlHash);
            $(".EditButtons").show();
            $("button").show();	
            if ($.browser.msie != true)
                $(".ItemDetailTable").show();                      
                        
            if (showLinksToOtherEditors)
            {
                $("#linksToEditors").html('');
                $("#linksToEditors").add_Link("Elrte Editor"  , window.location.hash).click(showEditor_Elrte);
                $("#linksToEditors").add_Link("RawHtml Editor", window.location.hash).click(showEditor_RawHtml);
                $("#linksToEditors").add_Link("CLEditor Editor", window.location.hash).click(showEditor_CLEditor);
            
                $("#linksToEditors").absolute().top(8).left(500);
                $("#linksToEditors a").css('padding',5);
            }									
        }
        
        var mapAutoCompleteValues = function()
            {	
                try 
                {
                    if(opener == null)
                        opener=parent;
                    
                    if(opener != null)
                    {					
                        technologies =[];  opener.$("#pivotPanel_Technology input").each(function() { technologies.push($(this).parent().find("label").html())  } ); 
                        phases =[];  opener.$("#pivotPanel_Phase input").each(function()			{ phases.push($(this).parent().find("label").html())  } ); 
                        types =[];  opener.$("#pivotPanel_Type input").each(function() 				{ types.push($(this).parent().find("label").html())  } ); 
                        categories =[];  opener.$("#pivotPanel_Category input").each(function() 	{ categories.push($(this).parent().find("label").html())  } ); 
                    
                        /*$("#TechnologyLabel"	).autocomplete( { source: technologies });					
                        $("#PhaseLabel"			).autocomplete( { source: phases	   	});			
                        $("#GuidanceTypeLabel"	).autocomplete( { source: types		   	});
                        $("#CategoriesLabel"	).autocomplete( { source: categories 	});				
                        */
                    
                        var loadData = function(data, target)
                        {
                            $.each(data, function(index, value)
                                {
                                    $(target).append($("<option>").append(value).attr('value', value))
                                });
                        }
                        loadData(technologies,"#TechnologyValue");
                        loadData(phases,"#PhaseValue");
                        loadData(types,"#TypeValue");
                        loadData(categories,"#CategoryValue");
                    }
                } 
                catch (e) 
                {
    
                }
            }
        
        var showGuiBasedOnUserPrivileges = function()
            {				
                currentUserHasRole('EditArticles', 
                    function(result){		                                        							
                                        if(result.d)
                                            loadEditor();	
                                        else
                                        {											
                                            $("button").hide();
                                            "ItemDetailTable".$().hide();
                                            showMessage("Editing access denied.");											
                                            $("#guidanceItemEditor").show().html("<h2>Access denied.</h2><br/><p>Please close this window or <a href='/Login'>login</a></p>");
                                            //"guidanceItemEditor".$().html("<h1>Access denied.</h1><h2>please close this window</h2>");
                                        }													
                                    });
            }
            
        $(function()
            {												                
                $(".ItemDetailTable").hide();
                $(".EditButtons").hide();
                
                loadGuidanceItemEditor();
                mapAutoCompleteValues();
                createComboBoxForAutoComplete();
                                
                if ($("#loadingMessage").length ===1)
                    $("#loadingMessage").remove();	
                
                TM.Gui.ShowProgressBar.close();
                
                
                TM.Events.onUserDataLoaded	.add(showGuiBasedOnUserPrivileges);
                TM.Gui.CurrentUser.loadUserData();
                
                
                
                $("button").button();
                
                $("#backToViewer").click(openGuidanceItemViewer);                
                $("#saveChanges").click(saveEditorCode);
                $("#previewChanges").click(previewEditorCode);
                $("#editSource").click(openNotepadEditor);
                
                //css changes
                "ItemTitle".$().css('width', '100%');
                $(".ui-autocomplete-input").width(140) ;
                $(".ItemDetailTable").width(750)				

            });
            
        $(window).bind('hashchange', setGuidanceIdfromUrlHash);
        
        $('a').live('click',function () 
            { 
                var href = $(this).attr('href');
                if(isDefined(href))
                {
                    window.location.hash = href;                  					
                    return href.slice(0,11)!="id";
                }
                return true;
            });