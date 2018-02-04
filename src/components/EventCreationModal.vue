<template> 
<form action="">
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Création d'un évenement</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Nom">
                <b-input
                     type="text"
                     placeholder="Nom"
                     required>
                </b-input>
            </b-field>

            <b-field grouped>
                <b-field label="Début" expanded>
                    <b-field>
                        <b-datepicker
                         placeholder="Sélectionner"
                         icon="calendar-today">
                        </b-datepicker>
                        <b-input
                         type="time"
                         value="12:30"
                         required>
                        </b-input>
                    </b-field>
                </b-field>
                <b-field label="Fin" expanded>
                    <b-field>
                        <b-datepicker
                         placeholder="Sélectionner"
                         icon="calendar-today">
                        </b-datepicker>
                        <b-input
                         type="time"
                         value="12:30"
                         required>
                        </b-input>
                    </b-field>
                </b-field>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-danger" type="button" @click="$parent.close()">Annuler</button>
            <button class="button is-primary">Ajouter</button>
        </footer>
    </div>
</form>
</template>


<script>
    export default {
        props: ['email', 'password'],
        data() {
            return {
                isComponentModalActive: false,
                formProps: {
                    email: 'evan@you.com',
                    password: 'testing'
                }
            }
        }
    }
</script>
