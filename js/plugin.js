(function ($) {
    $.fn.loadEditor = function(opt) {
        var settings = {
            forms : {},
            target : $(this)[0]
        }

        var funcoes = {
            addFormulario : function (config) {
                var params = {
                    title : '',
                    id : '',
                    campos : []
                };
                $.extend(params, config);

                var container  = document.createElement('div');
                var titleForm = document.createElement('h3');
                titleForm.appendChild(document.createTextNode(params.title));

                var form = document.createElement('form');
                form.setAttribute('id', params.id);

                form.campos = [];
                params.campos.forEach(function (value) {
                    var label = document.createElement('label');
                    label.appendChild(document.createTextNode(value.label));

                    form.appendChild(document.createElement('br'));
                    form.appendChild(label);
                    form.appendChild(document.createElement('br'));

                    var input = document.createElement(value.tag);
                    input.setAttribute('id', value.id);
                    input.setAttribute('type', value.type);
                    input.setAttribute('name', value.name);

                    input.label = label;
                    form.campos[value.id] = input;
                    form.appendChild(input);
                })

                settings.forms[params.id] = form;

                container.appendChild(titleForm);
                container.appendChild(form);
                settings.target.appendChild(container);
            },

            formulario : function(id) {
                if(settings.forms[id]){
                    $.extend(settings.forms[id], {
                            campo : function (idCampo) {
                                return $(settings.forms[id].campos[idCampo]);
                            },
                            label : function(idCampo) {
                                return $(settings.forms[id].campos[idCampo].label);
                            }
                        }
                    );
                }

                return settings.forms[id];
            }
        }

        return $.extend(this, funcoes);
    }
} (jQuery))